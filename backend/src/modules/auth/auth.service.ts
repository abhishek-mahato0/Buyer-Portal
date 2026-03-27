import { hashPassword, comparePassword } from "../../utils/hash";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";
import crypto from "crypto";
import { LoginData, RegisterData } from "./auth.types";
import { AppError } from "../../utils/AppError";
import { prisma } from "../../lib/prisma";
import { UserRepository } from "../user/user.respository";

export class AuthService {
  constructor(private userRepository: UserRepository = new UserRepository()) {}
  async register(data: RegisterData) {
    const { name, email, password } = data;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new AppError("User already exists", 400);

    const hashedPassword = await hashPassword(password);

    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = signAccessToken({ id: user.id, role: user.role });
    const refreshToken = signRefreshToken({ id: user.id });

    const hashedRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await this.userRepository.createRefreshToken(
      hashedRefreshToken,
      user.id,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    return { user, accessToken, refreshToken };
  }

  async login(data: LoginData) {
    const { email, password } = data;

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError("Invalid email or password", 401);

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new AppError("Invalid email or password", 401);

    const accessToken = signAccessToken({ id: user.id, role: user.role });
    const refreshToken = signRefreshToken({ id: user.id });

    const hashedRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await this.userRepository.createRefreshToken(
      hashedRefreshToken,
      user.id,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const dbToken = await this.userRepository.findRefreshToken(hashedToken);

    if (!dbToken) throw new AppError("Invalid refresh token", 401);
    if (dbToken.expiresAt < new Date())
      throw new AppError("Refresh token expired", 401);

    const accessToken = signAccessToken({
      id: dbToken.user.id,
      role: dbToken.user.role,
    });
    const newRefreshToken = signRefreshToken({ id: dbToken.user.id });
    await prisma.refreshToken.delete({ where: { id: dbToken.id } });

    const hashedNewRefreshToken = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");
    await this.userRepository.createRefreshToken(
      hashedNewRefreshToken,
      dbToken.user.id,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(token: string) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    await prisma.refreshToken.deleteMany({ where: { token: hashedToken } });
  }
}
