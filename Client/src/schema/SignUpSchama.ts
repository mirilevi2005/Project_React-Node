
import { z } from 'zod';

const SignUpSchama = z.object({
  userName: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
      .min(8, { message: "Password must be exactly 8 characters" })
      .max(8, { message: "Password must be exactly 8 characters" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
      adminCode: z.string().optional(),
});

export default SignUpSchama;
export type LoginType = z.infer<typeof SignUpSchama>; // type ייבוא באופן אוטומטי
