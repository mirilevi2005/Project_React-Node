// import {
//   Box,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
// import { useCookies } from "react-cookie";
// import {
//   useCreateTestMutation,
//   useUpdateTestMutation,
// } from "../../redux/slice/api/testApi";

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
// }

// interface CreateAndAddTestProps {
//   courseName: string;
//   refetchTests: () => void;
// }

// const defaultQuestion: QuestionInput = {
//   text: "",
//   answers: ["", "", "", ""],
//   correct: 0,
//   timeLimit: 30,
// };

// const CreateAndAddTest: React.FC<CreateAndAddTestProps> = ({
//   courseName,
//   refetchTests,
// }) => {
//   const [openTestDialog, setOpenTestDialog] = useState(false);

//   const [cookies] = useCookies(["token", "userId"]);

//   const [createTest] = useCreateTestMutation();
//   const [updateTest] = useUpdateTestMutation();

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

//   useEffect(() => {
//     if (fields.length === 0) append(defaultQuestion);
//   }, [append, fields.length]);

//   const addQuestion = () => append(defaultQuestion);

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
//       refetchTests();
//     } catch (err) {
//       console.error("❌ Error saving test:", err);
//     }
//   };

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

//       <Dialog
//         open={openTestDialog}
//         onClose={() => setOpenTestDialog(false)}
//         maxWidth="md"
//         fullWidth
//       >
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
//                 <Box
//                   key={field.id}
//                   sx={{ border: "1px solid #ccc", p: 2, mb: 2, borderRadius: 2 }}
//                 >
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
//                       {...register(`questions.${index}.answers.${i}`, {
//                         required: "תשובה חובה",
//                       })}
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
//     </Box>
//   );
// };

// export default CreateAndAddTest;











import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useCookies } from "react-cookie";
import {
  useCreateTestMutation,
  useUpdateTestMutation,
} from "../../redux/slice/api/testApi";

interface QuestionInput {
  text: string;
  answers: string[];
  correct: number;
  timeLimit: number;
}

interface IFormInput {
  TestName: string;
  LastDate: string;
  questions: QuestionInput[];
  _id?: string;
}

interface Props {
  courseName: string;
  refetchTests: () => void;
}

const defaultQuestion: QuestionInput = {
  text: "",
  answers: ["", "", "", ""],
  correct: 0,
  timeLimit: 30,
};

const CreateAndAddTest = ({courseName,refetchTests}:Props) => {
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const [cookies] = useCookies(["token", "userId"]);
  const [createTest] = useCreateTestMutation();
  const [updateTest] = useUpdateTestMutation();

  const {register,control,handleSubmit,formState: { errors },reset,watch,
  } = useForm<IFormInput>({
    defaultValues: {
      TestName: "",
      LastDate: "",
      questions: [defaultQuestion],
      _id: undefined,
    },
  });

  const { fields, append } = useFieldArray({ control, name: "questions" });

  useEffect(() => {
    if (fields.length === 0) append(defaultQuestion);
  }, [append, fields.length]);

  const addQuestion = () => append(defaultQuestion);

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
      if (formData._id) {
        await updateTest({ id: formData._id, updatedData: testData }).unwrap();
      } else {
        await createTest(testData).unwrap();
      }
      setOpenTestDialog(false);
      reset();
      refetchTests();
    } catch (err) {
      console.error("❌ Error saving test:", err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          reset({
            TestName: "",
            LastDate: "",
            questions: [defaultQuestion],
            _id: undefined,
          });
          setOpenTestDialog(true);
        }}
        sx={{ mr: 2 }}
      >
        צור מבחן
      </Button>

      <Dialog
        open={openTestDialog}
        onClose={() => setOpenTestDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {watch("_id") ? "עריכת מבחן" : "יצירת מבחן חדש"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
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
              {fields.map((field, index) => (
                <Box
                  key={field.id}
                  sx={{ border: "1px solid #ccc", p: 2, mb: 2, borderRadius: 2 }}
                >
                  <TextField
                    label={`שאלה ${index + 1}`}
                    {...register(`questions.${index}.text`, {
                      required: "שאלה חובה",
                    })}
                    error={!!errors.questions?.[index]?.text}
                    helperText={errors.questions?.[index]?.text?.message}
                    fullWidth
                    multiline
                  />
                  {[0, 1, 2, 3].map((i) => (
                    <TextField
                      key={i}
                      label={`אפשרות ${i + 1}`}
                      {...register(`questions.${index}.answers.${i}`, {
                        required: "תשובה חובה",
                      })}
                      error={!!errors.questions?.[index]?.answers?.[i]}
                      helperText={errors.questions?.[index]?.answers?.[i]?.message}
                      fullWidth
                      sx={{ mt: 1 }}
                    />
                  ))}
                  <TextField
                    label="מספר תשובה נכונה (1-4)"
                    type="number"
                    {...register(`questions.${index}.correct`, {
                      required: "תשובה נכונה חובה",
                      min: { value: 1, message: "המספר צריך להיות מ-0 עד 1" },
                      max: { value: 4, message: "המספר צריך להיות מ-0 עד 1" },
                    })}
                    error={!!errors.questions?.[index]?.correct}
                    helperText={errors.questions?.[index]?.correct?.message}
                    fullWidth
                    sx={{ mt: 1 }}
                  />
                  <TextField
                    label="זמן בשניות לשאלה"
                    type="number"
                    {...register(`questions.${index}.timeLimit`, {
                      required: "זמן חובה",
                      min: { value: 5, message: "מינימום 5 שניות" },
                    })}
                    error={!!errors.questions?.[index]?.timeLimit}
                    helperText={errors.questions?.[index]?.timeLimit?.message}
                    fullWidth
                    sx={{ mt: 1 }}
                  />
                </Box>
              ))}
              <Button variant="outlined" onClick={addQuestion}>
                הוסף שאלה
              </Button>
              <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                שמור
              </Button>
                 <Button onClick={() => { setOpenTestDialog(false); reset(); }} color="secondary" variant="outlined">
                  סגור
                </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateAndAddTest;

