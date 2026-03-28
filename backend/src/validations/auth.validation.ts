import v from "schema-validex";
import { Infer } from "schema-validex";

export const registerSchema = v.object({
  name: v.string().nonempty(),
  email: v.string().email().nonempty(),
  password: v.string().nonempty(),
});

export const loginSchema = v.object({
  email: v.string().email().nonempty(),
  password: v
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .min(8),
});
