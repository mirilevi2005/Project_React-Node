
// import { useEffect, useState } from "react";
// import {Box,Button,Dialog,DialogContent,DialogTitle,List,ListItem,ListItemText,
//   Stack,TextField,Typography,IconButton,} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {useGetTestsByCourseForTeacherQuery,useDeleteTestMutation,useUpdateTestMutation,
// } from "../../redux/slice/api/testApi";
// import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
// import { useCookies } from "react-cookie";
// import { IFormInput } from "../../interface/VideoMaterial";
// import { TestType,QuestionInput } from "../../interface/Exam";



// const defaultQuestion: QuestionInput = {
//   text: "",
//   answers: ["", "", "", ""],
//   correct: 0,
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

//   const {register, control, handleSubmit, formState: { errors }, reset, watch, setValue,} = useForm<IFormInput>({
//     defaultValues: {
//       TestName: "",
//       LastDate: "",
//       questions: [defaultQuestion],
//       _id: undefined,
//     },
//   });

//   const { fields, append, update, remove } = useFieldArray({
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
//         correctAnswer: q.answers[q.correct],
//         timeLimit: Number(q.timeLimit),
//       })),
//       teacherId: userId,
//       courseName,
//     };

//     try {
//       await updateTest({ id: formData._id || "", updatedData: testData }).unwrap();
//       setOpenTestDialog(false);
//       reset();
//       refetch();
//     } catch (err) {
//       console.error("❌ Error saving test:", err);
//     }
//   };

//   const handleUpdateTest = (testToEdit: TestType) => {
//     const fixedQuestions: QuestionInput[] = testToEdit.questions.map((q) => ({
//       text: q.questionText,
//       answers: q.options,
//       correct: q.options.findIndex((opt) => opt === q.correctAnswer),
//       timeLimit: q.timeLimit,
//     }));

//     reset({
//       TestName: testToEdit.title,
//       LastDate: new Date(testToEdit.lastDate).toISOString().slice(0, 16),
//       questions: fixedQuestions,
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

//   // מעדכן את התשובה הנכונה לשאלה ספציפית
//   const onCorrectAnswerChange = (questionIndex: number, answerIndex: number) => {
//     setValue(`questions.${questionIndex}.correct`, answerIndex);
//   };

//   return (
//     <div>
//       {/* דיאלוג רשימת מבחנים */}
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
//           <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
//             <Button onClick={() => setOpenTestsDialog(false)} color="secondary" variant="outlined">
//               סגור
//             </Button>
//           </Box>
//         </DialogContent>
//       </Dialog>

//       {/* דיאלוג עריכת/יצירת מבחן */}
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
//                 <Box
//                   key={question.id}
//                   sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2 }}
//                 >
//                   <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
//                     <Typography variant="subtitle1">שאלה {qIndex + 1}</Typography>
//                     <IconButton
//                       aria-label="מחק שאלה"
//                       color="error"
//                       onClick={() => remove(qIndex)}
//                       size="small"
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </Stack>
//                   <Stack spacing={1}>
//                     <TextField
//                       label={`טקסט שאלה`}
//                       {...register(`questions.${qIndex}.text` as const, {
//                         required: "שדה שאלה חובה",
//                       })}
//                       error={!!errors.questions?.[qIndex]?.text}
//                       helperText={errors.questions?.[qIndex]?.text?.message}
//                       fullWidth
//                     />

//                     {[0, 1, 2, 3].map((aIndex) => (
//                       <TextField
//                         key={aIndex}
//                         label={`תשובה ${aIndex + 1}`}
//                         {...register(`questions.${qIndex}.answers.${aIndex}` as const, {
//                           required: "שדה תשובה חובה",
//                         })}
//                         error={!!errors.questions?.[qIndex]?.answers?.[aIndex]}
//                         helperText={errors.questions?.[qIndex]?.answers?.[aIndex]?.message}
//                         fullWidth
//                         defaultValue={question.answers[aIndex]}
//                         onClick={() => onCorrectAnswerChange(qIndex, aIndex)}
//                         InputProps={{
//                           style:
//                             watch(`questions.${qIndex}.correct`) === aIndex
//                               ? { border: "2px solid green" }
//                               : undefined,
//                         }}
//                       />
//                     ))}
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
//               <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
//                 <Button
//                   onClick={() => {
//                     setOpenTestDialog(false);
//                     reset();
//                   }}
//                   color="secondary"
//                   variant="outlined"
//                 >
//                   סגור
//                 </Button>
//                 <Button type="submit" variant="contained" color="primary">
//                   שמור מבחן
//                 </Button>
//               </Stack>
//             </Stack>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Tests;


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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetTestsByCourseForTeacherQuery,
  useDeleteTestMutation,
  useUpdateTestMutation,
} from "../../redux/slice/api/testApi";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useCookies } from "react-cookie";
import { IFormInput } from "../../interface/VideoMaterial";
import { TestType, QuestionInput } from "../../interface/Exam";

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
    watch,
    setValue,
  } = useForm<IFormInput>({
    defaultValues: {
      TestName: "",
      LastDate: "",
      questions: [defaultQuestion],
      _id: undefined,
    },
  });

  const { fields, append, update, remove } = useFieldArray({
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
        correctAnswer: q.answers[q.correct-1],
        timeLimit: Number(q.timeLimit),
      })),
      teacherId: userId,
      courseName,
    };

    try {
      await updateTest({ id: formData._id || "", updatedData: testData }).unwrap();
      setOpenTestDialog(false);
      reset();
      refetch();
    } catch (err) {
      console.error("❌ Error saving test:", err);
    }
  };

  const handleUpdateTest = (testToEdit: TestType) => {
    const fixedQuestions: QuestionInput[] = testToEdit.questions.map((q) => ({
      text: q.questionText,
      answers: q.options,
      correct: q.options.findIndex((opt) => opt === q.correctAnswer),
      timeLimit: q.timeLimit,
    }));

    reset({
      TestName: testToEdit.title,
      LastDate: new Date(testToEdit.lastDate).toISOString().slice(0, 16),
      questions: fixedQuestions,
      _id: testToEdit._id,
    });

    setOpenTestDialog(true);
  };

  const handleDeleteTest = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      try {
        await deleteTest(id).unwrap();
        refetch();
      } catch (error) {
        console.error("❌ Error deleting test:", error);
      }
    }
  };

  const onCorrectAnswerChange = (questionIndex: number, answerIndex: number) => {
    setValue(`questions.${questionIndex}.correct`, answerIndex);
  };

  return (
    <div>
      {/* Test list dialog */}
      <Dialog open={openTestsDialog} onClose={() => setOpenTestsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>All tests in course {courseName}</DialogTitle>
        <DialogContent>
          {testList.length === 0 ? (
            <Typography>No tests found for this course</Typography>
          ) : (
            <List>
              {testList.map((test) => (
                <ListItem key={test._id} divider>
                  <ListItemText
                    primary={test.title}
                    secondary={`Deadline: ${new Date(test.lastDate).toLocaleString()}`}
                  />
                  <Button onClick={() => handleUpdateTest(test)} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button color="error" onClick={() => handleDeleteTest(test._id)}>
                    Delete
                  </Button>
                </ListItem>
              ))}
            </List>
          )}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => setOpenTestsDialog(false)} color="secondary" variant="outlined">
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Edit/Create test dialog */}
      <Dialog
        open={openTestDialog}
        onClose={() => {
          setOpenTestDialog(false);
          reset();
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Test</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                label="Test Name"
                {...register("TestName", { required: "Test name is required" })}
                error={!!errors.TestName}
                helperText={errors.TestName?.message}
                fullWidth
              />
              <TextField
                label="Deadline"
                type="datetime-local"
                {...register("LastDate", { required: "Deadline is required" })}
                error={!!errors.LastDate}
                helperText={errors.LastDate?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <Typography variant="h6">Questions</Typography>
              {fields.map((question, qIndex) => (
                <Box
                  key={question.id}
                  sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2 }}
                >
                  <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">Question {qIndex + 1}</Typography>
                    <IconButton
                      aria-label="Delete question"
                      color="error"
                      onClick={() => remove(qIndex)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                  <Stack spacing={1}>
                    <TextField
                      label="Question text"
                      {...register(`questions.${qIndex}.text` as const, {
                        required: "Question text is required",
                      })}
                      error={!!errors.questions?.[qIndex]?.text}
                      helperText={errors.questions?.[qIndex]?.text?.message}
                      fullWidth
                    />

                    {[0, 1, 2, 3].map((aIndex) => (
                      <TextField
                        key={aIndex}
                        label={`Answer ${aIndex + 1}`}
                        {...register(`questions.${qIndex}.answers.${aIndex}` as const, {
                          required: "Answer is required",
                        })}
                        error={!!errors.questions?.[qIndex]?.answers?.[aIndex]}
                        helperText={errors.questions?.[qIndex]?.answers?.[aIndex]?.message}
                        fullWidth
                        defaultValue={question.answers[aIndex]}
                        onClick={() => onCorrectAnswerChange(qIndex, aIndex)}
                        InputProps={{
                          style:
                            watch(`questions.${qIndex}.correct`) === aIndex
                              ? { border: "2px solid green" }
                              : undefined,
                        }}
                      />
                    ))}
                    <TextField
                      label="Time limit (in seconds)"
                      type="number"
                      {...register(`questions.${qIndex}.timeLimit` as const, {
                        required: "Time limit is required",
                        min: 10,
                      })}
                      error={!!errors.questions?.[qIndex]?.timeLimit}
                      helperText={errors.questions?.[qIndex]?.timeLimit?.message}
                      fullWidth
                    />
                  </Stack>
                </Box>
              ))}
              <Button onClick={() => append(defaultQuestion)}>Add Question</Button>
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button
                  onClick={() => {
                    setOpenTestDialog(false);
                    reset();
                  }}
                  color="secondary"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save Test
                </Button>
              </Stack>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tests;

