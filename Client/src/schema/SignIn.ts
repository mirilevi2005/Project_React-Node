// import { z } from "zod";

// const SignIn = z.object({
//   userName: z.string().min(1, { message: "Name must be at least 1 character" }),
//   email: z.string().email({ message: "Invalid email" }),
//   password: z.string()
//     .min(8, { message: "Password must be exactly 8 characters" })
//     .max(8, { message: "Password must be exactly 8 characters" })
//     .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
//     .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
//   adminCode: z.string().min(4, { message: "Admin code is required" }), // ✅ חדש
// });

// export type LoginType = z.infer<typeof SignIn>;
// export default SignIn;




// // schemas.ts
// import { z } from "zod";

// export const SignInSchema = z.object({
//   email: z.string().email("אימייל לא חוקי"),
//   password: z.string()
//     .min(8, "הסיסמה חייבת להיות לפחות 8 תווים")
//     .max(8, "הסיסמה חייבת להיות בדיוק 8 תווים")
//     .regex(/[A-Z]/, "חייבת לכלול אות גדולה")
//     .regex(/[^A-Za-z0-9]/, "חייבת לכלול תו מיוחד"),
// });

// export const TempPasswordSchema = z.object({
//   tempPassword: z.string().min(1, "אנא הזן את הסיסמה הזמנית"),
// });

// export const NewPasswordSchema = z.object({
//   newPassword: z.string().min(8, "הסיסמה חייבת להיות לפחות 8 תווים"),
//   confirmNewPassword: z.string().min(8, "אשר את הסיסמה החדשה"),
// }).refine((data) => data.newPassword === data.confirmNewPassword, {
//   message: "הסיסמאות לא תואמות",
//   path: ["confirmNewPassword"],
// });



// // schemas.ts
// import { z } from "zod";

// export const SignInSchema = z.object({
//   email: z.string().email("אימייל לא חוקי"),
//   password: z.string()
//     .min(8, "הסיסמה חייבת להיות לפחות 8 תווים")
//     .max(8, "הסיסמה חייבת להיות בדיוק 8 תווים")
//     .regex(/[A-Z]/, "חייבת לכלול אות גדולה")
//     .regex(/[^A-Za-z0-9]/, "חייבת לכלול תו מיוחד"),
// });

// export const TempPasswordSchema = z.object({
//   tempPassword: z.string().min(1, "אנא הזן את הסיסמה הזמנית"),
// });

// export const NewPasswordSchema = z.object({
//   newPassword: z.string().min(8, "הסיסמה חייבת להיות לפחות 8 תווים"),
//   confirmNewPassword: z.string().min(8, "אשר את הסיסמה החדשה"),
// }).refine((data) => data.newPassword === data.confirmNewPassword, {
//   message: "הסיסמאות לא תואמות",
//   path: ["confirmNewPassword"],
// });

// // טיפוסים מתוך הסכימות
// export type SignInForm = z.infer<typeof SignInSchema>;
// export type TempPasswordForm = z.infer<typeof TempPasswordSchema>;
// export type NewPasswordForm = z.infer<typeof NewPasswordSchema>;



// schemas.ts
import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("אימייל לא חוקי"),
  password: z.string()
    .min(8, "הסיסמה חייבת להיות לפחות 8 תווים")
    .max(8, "הסיסמה חייבת להיות בדיוק 8 תווים")
    .regex(/[A-Z]/, "חייבת לכלול אות גדולה")
    .regex(/[^A-Za-z0-9]/, "חייבת לכלול תו מיוחד"),
});

export const TempPasswordSchema = z.object({
  tempPassword: z.string().min(1, "אנא הזן את הסיסמה הזמנית"),
});

export const NewPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'הסיסמה חייבת להכיל לפחות 8 תווים')
    .regex(/[A-Z]/, 'הסיסמה חייבת להכיל לפחות אות גדולה אחת')
    .regex(/[^A-Za-z0-9]/, 'הסיסמה חייבת להכיל לפחות תו מיוחד אחד'),
  confirmNewPassword: z.string()
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'הסיסמאות אינן תואמות',
  path: ['confirmNewPassword'],
});

// טיפוסים מתוך הסכימות
export type SignInForm = z.infer<typeof SignInSchema>;
export type TempPasswordForm = z.infer<typeof TempPasswordSchema>;
export type NewPasswordForm = z.infer<typeof NewPasswordSchema>;

// נוסיף גם סכמה לאימייל בודד, אם כי בקוד המקורי השתמשת ב-TextField רגיל
// אם תרצה להשתמש ב-react-hook-form גם לשדות אימייל בודדים, זה יהיה שימושי
export const EmailSchema = z.object({
  email: z.string().email("אימייל לא חוקי"),
});
export type EmailForm = z.infer<typeof EmailSchema>;