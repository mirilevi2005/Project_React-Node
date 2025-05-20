
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
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useCookies } from "react-cookie";
import {
  useGetTestsByCourseForTeacherQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
  useLazyGetTestScoresQuery,
} from "../../redux/slice/api/testApi";

interface StudentScore {
  studentId: string;
  userName: string;
  score: number;
  finishedAt?: string;
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
  title?: string;
}

const defaultQuestion: QuestionInput = {
  text: "",
  answers: ["", "", "", ""],
  correct: 0,
  timeLimit: 30,
};
const Test = () => {
  // מצב דיאלוגים
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const [openTestsDialog, setOpenTestsDialog] = useState(false);
  const [openGradesDialog, setOpenGradesDialog] = useState(false);

  // ציוני מבחנים לפי מבחן
  const [selectedGrades, setSelectedGrades] = useState<{ [testId: string]: StudentScore[] }>({});

  // קבלת שם הקורס מתוך ה-URL
  const courseName = window.location.pathname.split("/").pop() || "";

  // קבלת קוקיז
  const [cookies] = useCookies(["token", "userId"]);

  // שאילת מבחנים
  const { data: testsData, refetch } = useGetTestsByCourseForTeacherQuery(courseName);
  const testList: TestType[] = testsData?.tests ?? [];

  // מטודות CRUD
  const [createTest] = useCreateTestMutation();
  const [updateTest] = useUpdateTestMutation();
  const [deleteTest] = useDeleteTestMutation();
const [triggerGetTestScores] = useLazyGetTestScoresQuery();
  // react-hook-form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormInput>({
    defaultValues: {
      TestName: "",
      LastDate: "",
      questions: [defaultQuestion],
      _id: "",
      title: "",
    },
  });

  const { fields, append } = useFieldArray({ control, name: "questions" });

  // הוספת שאלה אם הרשימה ריקה
  useEffect(() => {
    if (fields.length === 0) append(defaultQuestion);
  }, [append, fields.length]);

  // הוספת שאלה חדשה
  const addQuestion = () => append(defaultQuestion);

  // שמירת מבחן (יצירה / עדכון)
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
      refetch();
    } catch (err) {
      console.error("❌ Error saving test:", err);
    }
  };

  // מילוי הטופס לעריכה
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
      title: testToEdit.title,
    });
    setOpenTestDialog(true);
  };

  // מחיקת מבחן
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


const handleOpenGradesDialog = async () => {
  const grades: { [testId: string]: StudentScore[] } = {};

  for (const test of testList) {
    try {
      // const response = await triggerGetTestScores(test._id).unwrap(); // response.scores!!
      // grades[test._id] = response.scores ?? [];
      const response = await triggerGetTestScores(test._id).unwrap();
     grades[test._id] = response.scores ?? [];


    } catch (err) {
      console.error("שגיאה בטעינת ציונים למבחן:", test.title, err);
      grades[test._id] = [];
    }
  }

  setSelectedGrades(grades);
  setOpenGradesDialog(true);
};

  return (
    <Box sx={{ p: 2 }}>
      {/* <Button variant="outlined" color="primary" onClick={() => setOpenTestDialog(true)} sx={{ mr: 2 }}>
        צור מבחן
      </Button> */}
      <Button
  variant="outlined"
  color="primary"
  onClick={() => {
    reset({
      TestName: "",
      LastDate: "",
      questions: [defaultQuestion],
      _id: "",
      title: "",
    });
    setOpenTestDialog(true);
  }}
  sx={{ mr: 2 }}
>
  צור מבחן
</Button>


      <Button variant="outlined" color="primary" onClick={() => setOpenTestsDialog(true)} sx={{ mr: 2 }}>
        הצגת כל המבחנים
      </Button>

      <Button variant="outlined" color="primary" onClick={handleOpenGradesDialog}>
        צפייה בציוני מבחנים
      </Button>

      {/* דיאלוג יצירת/עריכת מבחן */}
      <Dialog open={openTestDialog} onClose={() => setOpenTestDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{watch("_id") ? "עריכת מבחן" : "יצירת מבחן חדש"}</DialogTitle>
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
                <Box key={field.id} sx={{ border: "1px solid #ccc", p: 2, mb: 2, borderRadius: 2 }}>
                  <TextField
                    label={`שאלה ${index + 1}`}
                    {...register(`questions.${index}.text`, { required: "שאלה חובה" })}
                    error={!!errors.questions?.[index]?.text}
                    helperText={errors.questions?.[index]?.text?.message}
                    fullWidth
                    multiline
                  />
                  {[0, 1, 2, 3].map((i) => (
                    <TextField
                      key={i}
                      label={`אפשרות ${i + 1}`}
                      {...register(`questions.${index}.answers.${i}`, { required: "תשובה חובה" })}
                      error={!!errors.questions?.[index]?.answers?.[i]}
                      helperText={errors.questions?.[index]?.answers?.[i]?.message}
                      fullWidth
                      sx={{ mt: 1 }}
                    />
                  ))}
                  <TextField
                    label="מספר תשובה נכונה (0-3)"
                    type="number"
                    {...register(`questions.${index}.correct`, {
                      required: "תשובה נכונה חובה",
                      min: { value: 0, message: "המספר צריך להיות מ-0 עד 3" },
                      max: { value: 3, message: "המספר צריך להיות מ-0 עד 3" },
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
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
      {/* דיאלוג הצגת כל המבחנים */}
      <Dialog open={openTestsDialog} onClose={() => setOpenTestsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>כל המבחנים בקורס</DialogTitle>
        <DialogContent>
          <List>
            {testList.length === 0 && <Typography>אין מבחנים בקורס זה.</Typography>}
            {testList.map((test) => (
              <ListItem
                key={test._id}
                secondaryAction={
                  <Box>
                    <Button size="small" onClick={() => handleUpdateTest(test)}>
                      ערוך
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDeleteTest(test._id)}>
                      מחק
                    </Button>
                  </Box>
                }
              >
                <ListItemText
                  primary={test.title}
                  secondary={`תאריך אחרון: ${new Date(test.lastDate).toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setOpenTestsDialog(false)}>סגור</Button>
          </Box>
        </DialogContent>
      </Dialog>

<Dialog open={openGradesDialog} onClose={() => setOpenGradesDialog(false)} maxWidth="md" fullWidth>
  <DialogTitle>ציוני מבחנים</DialogTitle>
  <DialogContent>
    {testList.map((test) => (
      <Box key={test._id} sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>{test.title}</Typography>
        {selectedGrades[test._id]?.length ? (
          <List sx={{ pl: 2 }}>
            {selectedGrades[test._id].map((score) => (
              <ListItem key={score.studentId} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2, borderBottom: '1px solid #ccc', pb: 1 }}>
                <Typography variant="body1">
                  <strong> userName:</strong> {score.userName || score.studentId}

                </Typography>
                <Typography variant="body1">
                  <strong> Done at:</strong> {score.finishedAt ? new Date(score.finishedAt).toLocaleString('he-IL') : "לא סיימה"}
                </Typography>
                <Typography variant="body1">
                  <strong>score:</strong> {score.score}
                </Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">אין ציונים להצגה</Typography>
        )}
      </Box>
    ))}
  </DialogContent>
</Dialog>

    </Box>
  );
};

export default Test;
