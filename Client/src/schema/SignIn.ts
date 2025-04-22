import { z } from "zod";

const SignUpSchama = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string()
    .min(8, { message: "Password must be exactly 8 characters" })
    .max(8, { message: "Password must be exactly 8 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" })
});

export type LoginType = z.infer<typeof SignUpSchama>; 

export default SignUpSchama;
