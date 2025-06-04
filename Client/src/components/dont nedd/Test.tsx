// import {
//   Box,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   List,
//   ListItem,
//   ListItemText,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
// import CourseScoresChart from "../CourseScoresChart"; // נתיב מתאים לפי מבנה התיקיות שלך

// import { useCookies } from "react-cookie";
// import {
//   useGetTestsByCourseForTeacherQuery,
//   useCreateTestMutation,
//   useUpdateTestMutation,
//   useDeleteTestMutation,
//   useLazyGetTestScoresQuery,
// } from "../../redux/slice/api/testApi";
// import ExistingTestsManagement from "../test/ExistingTestsManagement";

// interface StudentScore {
//   studentId: string;
//   userName: string;
//   score: number;
//   finishedAt?: string;
// }

// interface TestType {
//   _id: string;
//   title: string;
//   lastDate: string;
//   questions: {
//     questionText: string;
//     options: string[];
//     correctAnswer: string;
//     timeLimit: number;
//   }[];
// }

// interface QuestionInput {
//   text: string;
//   answers: string[];
//   correct: number;
//   timeLimit: number;
// }

// interface IFormInput {
//   TestName: string;
//   LastDate: string;
//   questions: QuestionInput[];
//   _id?: string;
//   title?: string;
// }

// const defaultQuestion: QuestionInput = {
//   text: "",
//   answers: ["", "", "", ""],
//   correct: 0,
//   timeLimit: 30,
// };
// const Test = () => {
//   // דיאלוגים
//   const [openTestDialog, setOpenTestDialog] = useState(false);
//   const [openTestsDialog, setOpenTestsDialog] = useState(false);///מירי
//   const [openGradesDialog, setOpenGradesDialog] = useState(false);

//   // ציונים לפי מבחן
//   const [selectedGrades, setSelectedGrades] = useState<{ [testId: string]: StudentScore[] }>({});

//   // קבלת שם הקורס מתוך ה-URL
//   const courseName = window.location.pathname.split("/").pop() || "";

//   // קוקיז
//   const [cookies] = useCookies(["token", "userId"]);

//   // שאילת מבחנים
//   const { data: testsData, refetch } = useGetTestsByCourseForTeacherQuery(courseName);
//   const testList: TestType[] = testsData?.tests ?? [];

//   // מטודות CRUD
//   const [createTest] = useCreateTestMutation();
//   const [updateTest] = useUpdateTestMutation();
//   const [deleteTest] = useDeleteTestMutation();
//   const [triggerGetTestScores] = useLazyGetTestScoresQuery();
//   // react-hook-form
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//   } = useForm<IFormInput>({
//     defaultValues: {
//       TestName: "",
//       LastDate: "",
//       questions: [defaultQuestion],
//       _id: undefined,
//     },
//   });

//   const { fields, append } = useFieldArray({ control, name: "questions" });

//   // אם אין שאלות, להוסיף שאלה ברירת מחדל
//   useEffect(() => {
//     if (fields.length === 0) append(defaultQuestion);
//   }, [append, fields.length]);

//   const addQuestion = () => append(defaultQuestion);

//   // שמירת מבחן (יצירה או עדכון)
//   const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
//     const token = cookies.token;
//     const userId = cookies.userId;
//     if (!token || !userId) {
//       console.error("❌ Missing token or user ID");
//       return;
//     }

//     const testData = {
//       title: formData.TestName,
//       lastDate: formData.LastDate,
//       questions: formData.questions.map((q) => ({
//         questionText: q.text,
//         options: q.answers,
//         correctAnswer: q.answers[q.correct],
//         timeLimit: Number(q.timeLimit),
//       })),
//       teacherId: userId,
//       courseName,
//     };

//     try {
//       if (formData._id) {
//         await updateTest({ id: formData._id, updatedData: testData }).unwrap();
//       } else {
//         await createTest(testData).unwrap();
//       }
//       setOpenTestDialog(false);
//       reset();
//       refetch();
//     } catch (err) {
//       console.error("❌ Error saving test:", err);
//     }
//   };

//   // מילוי טופס לעריכה
//   const handleUpdateTest = (testToEdit: TestType) => {
//     reset({
//       TestName: testToEdit.title,
//       LastDate: new Date(testToEdit.lastDate).toISOString().slice(0, 16),
//       questions: testToEdit.questions.map((q) => ({
//         text: q.questionText,
//         answers: q.options,
//         correct: q.options.findIndex((opt) => opt === q.correctAnswer),
//         timeLimit: q.timeLimit,
//       })),
//       _id: testToEdit._id,
//     });
//     setOpenTestDialog(true);
//   };

//   // מחיקת מבחן
//   const handleDeleteTest = async (id: string) => {
//     if (window.confirm("האם את בטוחה שברצונך למחוק את המבחן?")) {
//       try {
//         await deleteTest(id).unwrap();
//         refetch();
//       } catch (error) {
//         console.error("❌ שגיאה במחיקת מבחן:", error);
//       }
//     }
//   };

//   // טעינת ציוני מבחנים
//   const handleOpenGradesDialog = async () => {
//    const grades: { [testId: string]: StudentScore[] } = {};

//     for (const test of testList) {
//       try {
//         const response = await triggerGetTestScores(test._id).unwrap();
//         grades[test._id] = response.scores ?? [];
//       } catch (err) {
//         console.error("שגיאה בטעינת ציונים למבחן:", test.title, err);
//         grades[test._id] = [];
//       }
//     }

//     setSelectedGrades(grades);
//     setOpenGradesDialog(true);
//   };
// const aggregatedScores = testList.map((test) => {
//   const scores = selectedGrades[test._id] ?? [];
//   const avgScore =
//     scores.reduce((sum, s) => sum + s.score, 0) / (scores.length || 1);
//   return {
//     testTitle: test.title,
//     averageScore: avgScore,
//   };
// });
//   return (
//     <Box sx={{ p: 2 }}>
//       <Button
//         variant="outlined"
//         color="primary"
//         onClick={() => {
//           reset({
//             TestName: "",
//             LastDate: "",
//             questions: [defaultQuestion],
//             _id: undefined,
//           });
//           setOpenTestDialog(true);
//         }}
//         sx={{ mr: 2 }}
//       >
//         צור מבחן
//       </Button>

//       <Button variant="outlined" color="primary" onClick={() => setOpenTestsDialog(true)} sx={{ mr: 2 }}>
//         הצגת כל המבחנים
//       </Button>

//       <Button variant="outlined" color="primary" onClick={handleOpenGradesDialog}>
//         צפייה בציוני מבחנים
//       </Button>
// <Box sx={{ mt: 4 }}>
//   {aggregatedScores.length === 0 ? (
//     <Typography>אין ציונים להצגת גרף</Typography>
//   ) : (
//     <CourseScoresChart aggregatedScores={aggregatedScores}  />

//   )}
// </Box>

//       {/* דיאלוג יצירת/עריכת מבחן */}
//       <Dialog open={openTestDialog} onClose={() => setOpenTestDialog(false)} maxWidth="md" fullWidth>
//         <DialogTitle>{watch("_id") ? "עריכת מבחן" : "יצירת מבחן חדש"}</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Stack spacing={2}>
//               <TextField
//                 label="שם מבחן"
//                 {...register("TestName", { required: "שם מבחן חובה" })}
//                 error={!!errors.TestName}
//                 helperText={errors.TestName?.message}
//                 fullWidth
//               />
//               <TextField
//                 label="תאריך אחרון"
//                 type="datetime-local"
//                 {...register("LastDate", { required: "תאריך אחרון חובה" })}
//                 error={!!errors.LastDate}
//                 helperText={errors.LastDate?.message}
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//               />
//               <Typography variant="h6">שאלות</Typography>
//               {fields.map((field, index) => (
//                 <Box key={field.id} sx={{ border: "1px solid #ccc", p: 2, mb: 2, borderRadius: 2 }}>
//                   <TextField
//                     label={`שאלה ${index + 1}`}
//                     {...register(`questions.${index}.text`, { required: "שאלה חובה" })}
//                     error={!!errors.questions?.[index]?.text}
//                     helperText={errors.questions?.[index]?.text?.message}
//                     fullWidth
//                     multiline
//                   />
//                   {[0, 1, 2, 3].map((i) => (
//                     <TextField
//                       key={i}
//                       label={`אפשרות ${i + 1}`}
//                       {...register(`questions.${index}.answers.${i}`, { required: "תשובה חובה" })}
//                       error={!!errors.questions?.[index]?.answers?.[i]}
//                       helperText={errors.questions?.[index]?.answers?.[i]?.message}
//                       fullWidth
//                       sx={{ mt: 1 }}
//                     />
//                   ))}
//                   <TextField
//                     label="מספר תשובה נכונה (0-3)"
//                     type="number"
//                     {...register(`questions.${index}.correct`, {
//                       required: "תשובה נכונה חובה",
//                       min: { value: 0, message: "המספר צריך להיות מ-0 עד 3" },
//                       max: { value: 3, message: "המספר צריך להיות מ-0 עד 3" },
//                     })}
//                     error={!!errors.questions?.[index]?.correct}
//                     helperText={errors.questions?.[index]?.correct?.message}
//                     fullWidth
//                     sx={{ mt: 1 }}
//                   />
//                   <TextField
//                     label="זמן בשניות לשאלה"
//                     type="number"
//                     {...register(`questions.${index}.timeLimit`, {
//                       required: "זמן חובה",
//                       min: { value: 5, message: "מינימום 5 שניות" },
//                     })}
//                     error={!!errors.questions?.[index]?.timeLimit}
//                     helperText={errors.questions?.[index]?.timeLimit?.message}
//                     fullWidth
//                     sx={{ mt: 1 }}
//                   />
//                 </Box>
//               ))}
//               <Button variant="outlined" onClick={addQuestion}>
//                 הוסף שאלה
//               </Button>
//               <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
//                 שמור
//               </Button>
//             </Stack>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* דיאלוג הצגת כל המבחנים */}
//       <Dialog open={openTestsDialog} onClose={() => setOpenTestsDialog(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>כל המבחנים בקורס {courseName}</DialogTitle>
//         <DialogContent>
//           {testList.length === 0 ? (
//             <Typography>לא נמצאו מבחנים בקורס זה</Typography>
//           ) : (
//             <List>
//               {testList.map((test) => (
//                 <ListItem key={test._id} divider>
//                   <ListItemText
//                     primary={test.title}
//                     secondary={`תאריך אחרון: ${new Date(test.lastDate).toLocaleString()}`}
//                   />
//                   <Button onClick={() => handleUpdateTest(test)} sx={{ mr: 1 }}>
//                     ערוך
//                   </Button>
//                   <Button color="error" onClick={() => handleDeleteTest(test._id)}>
//                     מחק
//                   </Button>
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* דיאלוג הצגת ציוני מבחנים */}
//       <Dialog open={openGradesDialog} onClose={() => setOpenGradesDialog(false)} maxWidth="md" fullWidth>
//         <DialogTitle>ציוני מבחנים</DialogTitle>
//         <DialogContent>
//           {testList.length === 0 && <Typography>אין מבחנים להצגת ציונים</Typography>}
//           {testList.map((test) => (
//             <Box key={test._id} sx={{ mb: 3 }}>
//               <Typography variant="h6">{test.title}</Typography>
//               {!selectedGrades[test._id] || selectedGrades[test._id].length === 0 ? (
//                 <Typography>אין ציונים עבור מבחן זה</Typography>
//               ) : (
//                 <List>
//                   {selectedGrades[test._id].map(({ studentId, userName, score, finishedAt }) => (
//                     <ListItem key={studentId} divider>
//                       <ListItemText
//                         primary={userName}
//                         secondary={`ציון: ${score} | תאריך סיום: ${
//                           finishedAt ? new Date(finishedAt).toLocaleString() : "לא הושלם"
//                         }`}
//                       />
//                     </ListItem>
//                   ))}
//                 </List>
//               )}
//             </Box>
//           ))}
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default Test;