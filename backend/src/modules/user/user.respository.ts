import { prisma } from "../../lib/prisma";
import { RegisterData } from "../auth/auth.types";

export class UserRepository {
  async createUser(data: RegisterData) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async createRefreshToken(token: string, userId: string, expiresAt: Date) {
    return await prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
  }

  async findRefreshToken(token: string) {
    return await prisma.refreshToken.findUnique({
      where: { token },
    });
  }

  async deleteRefreshToken(token: string) {
    return await prisma.refreshToken.delete({
      where: { token },
    });
  }
}
