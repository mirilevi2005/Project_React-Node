// import { z } from "zod";

//  const QuestionSchema = z.object({
//   text: z.string().min(1, "שדה שאלה חובה"),
//   answers: z.array(z.string().min(1, "שדה תשובה חובה")).length(4, "יש להוסיף בדיוק 4 תשובות"),
//   correct: z.number().min(1).max(4, "יש לבחור תשובה נכונה בין 1 ל-4"),
//   timeLimit: z.number().min(10, "מגבלת זמן לפחות 10 שניות"),
// });

//  const TestSchema = z.object({
//   TestName: z.string().min(1, "שם מבחן חובה"),
//   LastDate: z.string().min(1, "תאריך אחרון חובה"),
//   questions: z.array(QuestionSchema).min(1, "יש להוסיף לפחות שאלה אחת"),
//   _id: z.string().optional(),
// });

// export type TestType = z.infer<typeof TestSchema>;
// export { QuestionSchema, TestSchema };

import { z } from "zod";

export const questionSchema = z.object({
  text: z.string().min(1, "Question is required"),
  answers: z
    .array(z.string().min(1, "Answer is required"))
    .length(4, "Exactly 4 answers are required"),
  correct: z
    .number({
      required_error: "Correct answer is required",
      invalid_type_error: "Correct answer must be a number",
    })
    .min(1, "Number must be between 1 and 4")
    .max(4, "Number must be between 1 and 4"),
  timeLimit: z
    .number({
      required_error: "Time limit is required",
      invalid_type_error: "Time limit must be a number",
    })
    .min(5, "Minimum 5 seconds"),
});

export const testSchema = z.object({
  TestName: z.string().min(1, "Test name is required"),
  LastDate: z.string().min(1, "Last date is required"),
  questions: z.array(questionSchema),
  _id: z.string().optional(),
});

export type TestFormData = z.infer<typeof testSchema>;
