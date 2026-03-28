import v from "schema-validex";

export const loginSchema = v.object({
  email: v.string().email(),
  password: v.string().min(6),
});

export const registerSchema = v.object({
  name: v.string().min(3),
  email: v.string().email(),
  password: v
    .string()
    .min(6)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    ),
});
