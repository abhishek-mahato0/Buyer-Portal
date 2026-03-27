import { Router } from "express";
import { validate } from "../../middleware/validate";
import { registerSchema, loginSchema } from "../../validations/auth.validation";
import { register, login, refreshToken, logout } from "./auth.controller";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

export default router;
