
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  useGetTestsByCourseForTeacherQuery,
  useDeleteTestMutation,
  useUpdateTestMutation,
} from "../../redux/slice/api/testApi";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useCookies } from "react-cookie";

interface QuestionInput {
  text: string;
  answers: string[];
  correct: number;
  timeLimit: number;
}

interface TestType {
  _id: string;
  title: string;
  lastDate: string;
  questions: {
    questionText: string;
    options: string[];
    correctAnswer: string;
    timeLimit: number;
  }[];
}

interface IFormInput {
  TestName: string;
  LastDate: string;
  questions: QuestionInput[];
  _id?: string;
}

const defaultQuestion: QuestionInput = {
  text: "",
  answers: ["", "", "", ""],
  correct: 0,
  timeLimit: 30,
};

const Tests = () => {
  const [openTestsDialog, setOpenTestsDialog] = useState(false);
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const [deleteTest] = useDeleteTestMutation();
  const [updateTest] = useUpdateTestMutation();

  const courseName = window.location.pathname.split("/").pop() || "";
  const { data: testsData, refetch } = useGetTestsByCourseForTeacherQuery(courseName);
  const testList: TestType[] = testsData?.tests ?? [];
  const [cookies] = useCookies(["token", "userId"]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      TestName: "",
      LastDate: "",
      questions: [defaultQuestion],
      _id: undefined,
    },
  });

  const { fields, append, update } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(() => {
    setOpenTestsDialog(true);
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    const token = cookies.token;
    const userId = cookies.userId;
    if (!token || !userId) {
      console.error("❌ Missing token or user ID");
      return;
    }

    const testData = {
      title: formData.TestName,
      lastDate: formData.LastDate,
      questions: formData.questions.map((q) => ({
        questionText: q.text,
        options: q.answers,
        correctAnswer: q.answers[q.correct],
        timeLimit: Number(q.timeLimit),
      })),
      teacherId: userId,
      courseName,
    };

    try {
      await updateTest({ id: formData._id!, updatedData: testData }).unwrap();
      setOpenTestDialog(false);
      reset();
      refetch();
    } catch (err) {
      console.error("❌ Error saving test:", err);
    }
  };

  const handleUpdateTest = (testToEdit: TestType) => {
    reset({
      TestName: testToEdit.title,
      LastDate: new Date(testToEdit.lastDate).toISOString().slice(0, 16),
      questions: testToEdit.questions.map((q) => ({
        text: q.questionText,
        answers: q.options,
        correct: q.options.findIndex((opt) => opt === q.correctAnswer),
        timeLimit: q.timeLimit,
      })),
      _id: testToEdit._id,
    });
    setOpenTestDialog(true);
  };

  const handleDeleteTest = async (id: string) => {
    if (window.confirm("האם את בטוחה שברצונך למחוק את המבחן?")) {
      try {
        await deleteTest(id).unwrap();
        refetch();
      } catch (error) {
        console.error("❌ שגיאה במחיקת מבחן:", error);
      }
    }
  };

  const onCorrectAnswerChange = (questionIndex: number, answerIndex: number) => {
    update(questionIndex, {
      ...fields[questionIndex],
      correct: answerIndex,
    });
  };

  return (
    <div>
      {/* דיאלוג עם רשימת מבחנים */}
      <Dialog open={openTestsDialog} onClose={() => setOpenTestsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>כל המבחנים בקורס {courseName}</DialogTitle>
        <DialogContent>
          {testList.length === 0 ? (
            <Typography>לא נמצאו מבחנים בקורס זה</Typography>
          ) : (
            <List>
              {testList.map((test) => (
                <ListItem key={test._id} divider>
                  <ListItemText
                    primary={test.title}
                    secondary={`תאריך אחרון: ${new Date(test.lastDate).toLocaleString()}`}
                  />
                  <Button onClick={() => handleUpdateTest(test)} sx={{ mr: 1 }}>
                    ערוך
                  </Button>
                  <Button color="error" onClick={() => handleDeleteTest(test._id)}>
                    מחק
                  </Button>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>

      {/* דיאלוג עריכת מבחן */}
      <Dialog open={openTestDialog} onClose={() => { setOpenTestDialog(false); reset(); }} maxWidth="md" fullWidth>
        <DialogTitle>עריכת מבחן</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="שם מבחן"
                {...register("TestName", { required: "שם מבחן חובה" })}
                error={!!errors.TestName}
                helperText={errors.TestName?.message}
                fullWidth
              />
              <TextField
                label="תאריך אחרון"
                type="datetime-local"
                {...register("LastDate", { required: "תאריך אחרון חובה" })}
                error={!!errors.LastDate}
                helperText={errors.LastDate?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <Typography variant="h6">שאלות</Typography>
              {fields.map((question, qIndex) => (
                <Box key={question.id} sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2 }}>
                  <Stack spacing={1}>
                    <TextField
                      label={`שאלה ${qIndex + 1}`}
                      {...register(`questions.${qIndex}.text` as const, { required: "שדה שאלה חובה" })}
                      error={!!errors.questions?.[qIndex]?.text}
                      helperText={errors.questions?.[qIndex]?.text?.message}
                      fullWidth
                    />
                    {[0, 1, 2, 3].map((aIndex) => (
                      <TextField
                        key={aIndex}
                        label={`תשובה ${aIndex + 1}`}
                        {...register(`questions.${qIndex}.answers.${aIndex}` as const, {
                          required: "שדה תשובה חובה",
                        })}
                        error={!!errors.questions?.[qIndex]?.answers?.[aIndex]}
                        helperText={errors.questions?.[qIndex]?.answers?.[aIndex]?.message}
                        fullWidth
                        onClick={() => onCorrectAnswerChange(qIndex, aIndex)}
                        InputProps={{
                       
                        }}
                      />
                    ))}
                    <TextField
                      label="מגבלת זמן (בשניות)"
                      type="number"
                      {...register(`questions.${qIndex}.timeLimit` as const, {
                        required: "שדה זמן חובה",
                        min: 10,
                      })}
                      error={!!errors.questions?.[qIndex]?.timeLimit}
                      helperText={errors.questions?.[qIndex]?.timeLimit?.message}
                      fullWidth
                    />
                  </Stack>
                </Box>
              ))}
              <Button  onClick={() => append(defaultQuestion)}>
                הוסף שאלה 
              </Button>
              <Button type="submit" variant="contained" color="primary">
                שמור מבחן
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tests;























// import { useEffect, useState } from "react";
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
//   Radio,
//   RadioGroup,
//   FormControlLabel,
// } from "@mui/material";
// import {
//   useGetTestsByCourseForTeacherQuery,
//   useDeleteTestMutation,
//   useUpdateTestMutation,
// } from "../../redux/slice/api/testApi";
// import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
// import { useCookies } from "react-cookie";

// interface QuestionInput {
//   text: string;
//   answers: string[];
//   correct: number; // בין 1 ל-4
//   timeLimit: number;
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

// interface IFormInput {
//   TestName: string;
//   LastDate: string;
//   questions: QuestionInput[];
//   _id?: string;
// }

// const defaultQuestion: QuestionInput = {
//   text: "",
//   answers: ["", "", "", ""],
//   correct: 1, // צריך להתחיל מ-1 כדי להתאים לסכימה
//   timeLimit: 30,
// };

// const Tests = () => {
//   const [openTestsDialog, setOpenTestsDialog] = useState(false);
//   const [openTestDialog, setOpenTestDialog] = useState(false);
//   const [deleteTest] = useDeleteTestMutation();
//   const [updateTest] = useUpdateTestMutation();

//   const courseName = window.location.pathname.split("/").pop() || "";
//   const { data: testsData, refetch } = useGetTestsByCourseForTeacherQuery(courseName);
//   const testList: TestType[] = testsData?.tests ?? [];
//   const [cookies] = useCookies(["token", "userId"]);

//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm<IFormInput>({
//     defaultValues: {
//       TestName: "",
//       LastDate: "",
//       questions: [defaultQuestion],
//       _id: undefined,
//     },
//   });

//   const { fields, append } = useFieldArray({
//     control,
//     name: "questions",
//   });

//   useEffect(() => {
//     setOpenTestsDialog(true);
//   }, []);

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
//         correctAnswer: q.answers[q.correct - 1], // correct הוא 1-4, אבל המערך 0-3
//         timeLimit: Number(q.timeLimit),
//       })),
//       teacherId: userId,
//       courseName,
//     };

//     try {
//       await updateTest({ id: formData._id!, updatedData: testData }).unwrap();
//       setOpenTestDialog(false);
//       reset();
//       refetch();
//     } catch (err) {
//       console.error("❌ Error saving test:", err);
//     }
//   };

//   const handleUpdateTest = (testToEdit: TestType) => {
//     reset({
//       TestName: testToEdit.title,
//       LastDate: new Date(testToEdit.lastDate).toISOString().slice(0, 16),
//       questions: testToEdit.questions.map((q) => ({
//         text: q.questionText,
//         answers: q.options,
//         correct: q.options.findIndex((opt) => opt === q.correctAnswer) + 1, // +1 כי correct בין 1 ל-4
//         timeLimit: q.timeLimit,
//       })),
//       _id: testToEdit._id,
//     });
//     setOpenTestDialog(true);
//   };

//   const onCorrectAnswerChange = (questionIndex: number, answerIndex: number) => {
//     setValue(`questions.${questionIndex}.correct`, answerIndex + 1);
//   };
//     const handleDeleteTest = async (id: string) => {
//     if (window.confirm("האם את בטוחה שברצונך למחוק את המבחן?")) {
//       try {
//         await deleteTest(id).unwrap();
//         refetch();
//       } catch (error) {
//         console.error("❌ שגיאה במחיקת מבחן:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       {/* דיאלוג עם רשימת מבחנים */}
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

//       {/* דיאלוג עריכת מבחן */}
//       <Dialog
//         open={openTestDialog}
//         onClose={() => {
//           setOpenTestDialog(false);
//           reset();
//         }}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>עריכת מבחן</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Stack spacing={2} sx={{ mt: 2 }}>
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
//               {fields.map((question, qIndex) => (
//                 <Box key={question.id} sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2 }}>
//                   <Stack spacing={1}>
//                     <TextField
//                       label={`שאלה ${qIndex + 1}`}
//                       {...register(`questions.${qIndex}.text` as const, { required: "שדה שאלה חובה" })}
//                       error={!!errors.questions?.[qIndex]?.text}
//                       helperText={errors.questions?.[qIndex]?.text?.message}
//                       fullWidth
//                     />
//                     <RadioGroup
//                       value={String(question.correct || 1)}
//                       onChange={(e) => onCorrectAnswerChange(qIndex, Number(e.target.value) - 1)}
//                     >
//                       {[0, 1, 2, 3].map((aIndex) => (
//                         <FormControlLabel
//                           key={aIndex}
//                           value={String(aIndex + 1)}
//                           control={<Radio />}
//                           label={
//                             <TextField
//                               {...register(`questions.${qIndex}.answers.${aIndex}` as const, {
//                                 required: "שדה תשובה חובה",
//                               })}
//                               error={!!errors.questions?.[qIndex]?.answers?.[aIndex]}
//                               helperText={errors.questions?.[qIndex]?.answers?.[aIndex]?.message}
//                               fullWidth
//                               variant="standard"
//                             />
//                           }
//                         />
//                       ))}
//                     </RadioGroup>
//                     <TextField
//                       label="מגבלת זמן (בשניות)"
//                       type="number"
//                       {...register(`questions.${qIndex}.timeLimit` as const, {
//                         required: "שדה זמן חובה",
//                         min: 10,
//                       })}
//                       error={!!errors.questions?.[qIndex]?.timeLimit}
//                       helperText={errors.questions?.[qIndex]?.timeLimit?.message}
//                       fullWidth
//                     />
//                   </Stack>
//                 </Box>
//               ))}
//               <Button onClick={() => append(defaultQuestion)}>הוסף שאלה</Button>
//               <Button type="submit" variant="contained" color="primary">
//                 שמור מבחן
//               </Button>
//             </Stack>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Tests;



// import { useEffect, useState } from "react";
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
// import {
//   useGetTestsByCourseForTeacherQuery,
//   useDeleteTestMutation,
//   useUpdateTestMutation,
// } from "../../redux/slice/api/testApi";
// import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
// import { useCookies } from "react-cookie";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { TestSchema, TestType } from "../../schema/TestSchama";

// interface QuestionInput {
//   text: string;
//   answers: string[];
//   correct: number;
//   timeLimit: number;
// }

// const defaultQuestion: QuestionInput = {
//   text: "",
//   answers: ["", "", "", ""],
//   correct: 0,
//   timeLimit: 30,
// };

// interface TestTypeI {
//   _id: string;
//   title: string;
//   lastDate: string;
//   questions: {
//     questionText: string;
//     options: string[];
//     correctAnswer: string;
//     timeLimit: number;
//   }[];
//  }
// const Tests = () => {
//   const [openTestsDialog, setOpenTestsDialog] = useState(false);
//   const [openTestDialog, setOpenTestDialog] = useState(false);
//   const [deleteTest] = useDeleteTestMutation();
//   const [updateTest] = useUpdateTestMutation();

//   const courseName = window.location.pathname.split("/").pop() || "";
//   const { data: testsData, refetch } = useGetTestsByCourseForTeacherQuery(courseName);
//   const testList = testsData?.tests ?? [];
//   const [cookies] = useCookies(["token", "userId"]);

//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<TestType>({
//     resolver: zodResolver(TestSchema),
//     defaultValues: {
//       TestName: "",
//       LastDate: "",
//       questions: [defaultQuestion],
//       _id: undefined,
//     },
//   });

//   const { fields, append, update } = useFieldArray({
//     control,
//     name: "questions",
//   });

//   useEffect(() => {
//     setOpenTestsDialog(true);
//   }, []);

//   const onSubmit: SubmitHandler<TestType> = async (formData) => {
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
//       await updateTest({ id: formData._id!, updatedData: testData }).unwrap();
//       setOpenTestDialog(false);
//       reset();
//       refetch();
//     } catch (err) {
//       console.error("❌ Error saving test:", err);
//     }
//   };

//   const handleUpdateTest = (testToEdit:TestTypeI) => {
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

//   const onCorrectAnswerChange = (questionIndex: number, answerIndex: number) => {
//     update(questionIndex, {
//       ...fields[questionIndex],
//       correct: answerIndex,
//     });
//   };

//   return (
//     <div>
//       {/* דיאלוג עם רשימת מבחנים */}
//       <Dialog open={openTestsDialog} onClose={() => setOpenTestsDialog(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>כל המבחנים בקורס {courseName}</DialogTitle>
//         <DialogContent>
//           {testList.length === 0 ? (
//             <Typography>לא נמצאו מבחנים בקורס זה</Typography>
//           ) : (
//             <List>
//               {testList.map((test:TestTypeI) => (
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

//       {/* דיאלוג עריכת מבחן */}
//       <Dialog open={openTestDialog} onClose={() => { setOpenTestDialog(false); reset(); }} maxWidth="md" fullWidth>
//         <DialogTitle>עריכת מבחן</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Stack spacing={2} sx={{ mt: 2 }}>
//               <TextField
//                 label="שם מבחן"
//                 {...register("TestName")}
//                 error={!!errors.TestName}
//                 helperText={errors.TestName?.message}
//                 fullWidth
//               />
//               <TextField
//                 label="תאריך אחרון"
//                 type="datetime-local"
//                 {...register("LastDate")}
//                 error={!!errors.LastDate}
//                 helperText={errors.LastDate?.message}
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//               />
//               <Typography variant="h6">שאלות</Typography>
//               {fields.map((question, qIndex) => (
//                 <Box key={question.id} sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2 }}>
//                   <Stack spacing={1}>
//                     <TextField
//                       label={`שאלה ${qIndex + 1}`}
//                       {...register(`questions.${qIndex}.text` as const)}
//                       error={!!errors.questions?.[qIndex]?.text}
//                       helperText={errors.questions?.[qIndex]?.text?.message}
//                       fullWidth
//                     />
//                     {[0, 1, 2, 3].map((aIndex) => (
//                       <TextField
//                         key={aIndex}
//                         label={`תשובה ${aIndex + 1}`}
//                         {...register(`questions.${qIndex}.answers.${aIndex}` as const)}
//                         error={!!errors.questions?.[qIndex]?.answers?.[aIndex]}
//                         helperText={errors.questions?.[qIndex]?.answers?.[aIndex]?.message}
//                         fullWidth
//                         onClick={() => onCorrectAnswerChange(qIndex, aIndex)}
//                       />
//                     ))}
//                     <TextField
//                       label="מגבלת זמן (בשניות)"
//                       type="number"
//                       {...register(`questions.${qIndex}.timeLimit` as const)}
//                       error={!!errors.questions?.[qIndex]?.timeLimit}
//                       helperText={errors.questions?.[qIndex]?.timeLimit?.message}
//                       fullWidth
//                     />
//                   </Stack>
//                 </Box>
//               ))}
//               <Button onClick={() => append(defaultQuestion)}>הוסף שאלה</Button>
//               <Button type="submit" variant="contained" color="primary">
//                 שמור מבחן
//               </Button>
//             </Stack>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Tests;

