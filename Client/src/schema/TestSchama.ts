import { z } from "zod";

 const QuestionSchema = z.object({
  text: z.string().min(1, "שדה שאלה חובה"),
  answers: z.array(z.string().min(1, "שדה תשובה חובה")).length(4, "יש להוסיף בדיוק 4 תשובות"),
  correct: z.number().min(1).max(4, "יש לבחור תשובה נכונה בין 1 ל-4"),
  timeLimit: z.number().min(10, "מגבלת זמן לפחות 10 שניות"),
});

 const TestSchema = z.object({
  TestName: z.string().min(1, "שם מבחן חובה"),
  LastDate: z.string().min(1, "תאריך אחרון חובה"),
  questions: z.array(QuestionSchema).min(1, "יש להוסיף לפחות שאלה אחת"),
  _id: z.string().optional(),
});

export type TestType = z.infer<typeof TestSchema>;
export { QuestionSchema, TestSchema };


