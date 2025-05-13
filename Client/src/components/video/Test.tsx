import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, MenuItem, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useForm ,SubmitHandler, useFieldArray} from "react-hook-form";
import { IFormInput } from "../../interface/VideoMaterial";
import { Cookies, useCookies } from "react-cookie";
import SignatureCanvas from "react-signature-canvas";
import { useGetTestsByCourseQuery ,useCreateTestMutation} from "../../redux/slice/api/testApi";
import TestListDialog from "./TestListDialog";

const Test= () => {
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const [openSignatureDialog, setOpenSignatureDialog] = useState(false);
  const [openTestsDialog, setOpenTestsDialog] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any | null>(null);
  const [signature, setSignature] = useState<any>(null);
  const urlParts = window.location.pathname.split('/');
  const courseName = urlParts[urlParts.length - 1];
  const [cookies] = useCookies(['token', 'userId']);
  const { data } = useGetTestsByCourseQuery(courseName);
  const testList = data?.tests ?? [];
  const [uploadedCourse, setUploadedCourse] = useState<string | null>(null);
  const [createTest] = useCreateTestMutation();

   const { register, control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      TestName: "",
      LastDate: "",
      questions: [{
        text: "",
        answers: ["", "", "", ""],
        correct: 0,
        timeLimit: 30,
      }],
    },
  });

  ////האם יש דרך אחרת חוץ מ useEffect
  useEffect(() => {
    setUploadedCourse(courseName);
  }, [courseName])

  const { fields, append } = useFieldArray({
  control,
  name: "questions",
  });
    useEffect(() => {
    if (fields.length === 0) {
      append({
        text: "",
        answers: ["", "", "", ""],
        correct: 0,
        timeLimit: 30,
      });
    }
  }, [append, fields.length]);

  

  const addQuestion = () => {
    append({
      text: "",
      answers: ["", "", "", ""],
      correct: 0,
      timeLimit: 30,
    });
  };

 
   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const token = cookies.token;
    const userId = cookies.userId;

    if (!token || !userId) {
      console.error("Missing token or user ID");
      return;
    }

    const testData = {
      title: data.TestName,
      lastDate: data.LastDate,
      questions: data.questions.map((q) => ({
        questionText: q.text,
        options: q.answers,
        correctAnswer: q.answers[q.correct],
        timeLimit: parseInt(q.timeLimit.toString()),
      })),
      teacherId: userId,
      courseName: courseName,
    };

    try {
      await createTest(testData).unwrap();
      setOpenTestDialog(false);
      setOpenSignatureDialog(true);
    } catch (err) {
      console.error("Error creating test:", err);
    }
  };
  
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpenTestDialog(true)} sx={{ ml: 2 }}>
        צור מבחן
     </Button>
      <Button variant="outlined" color="primary" onClick={() => setOpenTestsDialog(true)} sx={{ ml: 2 }}>
       הצגת כל המבחנים לקורס זה
     </Button>
     <TestListDialog
        open={openTestsDialog}
        onClose={() => setOpenTestsDialog(false)}
      />
       <Dialog open={openTestDialog} onClose={() => setOpenTestDialog(false)} maxWidth="lg" fullWidth>
       <DialogTitle>יצירת מבחן חדש</DialogTitle>
       <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="שם מבחן"
                {...register("TestName", { required: true })}
                error={!!errors.TestName}
                helperText={errors.TestName && "שדה חובה"}
              />
              <TextField
                label="תאריך אחרון"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                {...register("LastDate", { required: true })}
                error={!!errors.LastDate}
                helperText={errors.LastDate && "שדה חובה"}
              />

              <Typography variant="h5" mt={4}>שאלות</Typography>
              {fields.map((field, index) => (
                <Card key={field.id} variant="outlined" sx={{ mt: 2 }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <TextField
                        label={`שאלה ${index + 1}`}
                        {...register(`questions.${index}.text`, { required: true })}
                        error={!!errors.questions?.[index]?.text}
                        helperText={errors.questions?.[index]?.text && "שדה חובה"}
                      />
                      {Array(4).fill(0).map((_, ansIndex) => (
                        <TextField
                          key={ansIndex}
                          label={`תשובה ${ansIndex + 1}`}
                          {...register(`questions.${index}.answers.${ansIndex}`, { required: true })}
                          error={!!errors.questions?.[index]?.answers?.[ansIndex]}
                          helperText={errors.questions?.[index]?.answers?.[ansIndex] && "שדה חובה"}
                        />
                      ))}
                      <TextField
                        select
                        label="תשובה נכונה"
                        defaultValue={field.correct}
                        {...register(`questions.${index}.correct`, { required: true })}
                      >
                        {[0, 1, 2, 3].map((opt) => (
                          <MenuItem key={opt} value={opt}>תשובה {opt + 1}</MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        label="הגבלת זמן (שניות)"
                        type="number"
                        {...register(`questions.${index}.timeLimit`, { required: true })}
                        error={!!errors.questions?.[index]?.timeLimit}
                        helperText={errors.questions?.[index]?.timeLimit && "שדה חובה"}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outlined" onClick={addQuestion}>הוסף שאלה</Button>
              <Button type="submit" variant="contained" color="primary">שמור מבחן</Button>
            </Stack>
          </form>
        </DialogContent>
        <Button onClick={() => {  setOpenTestDialog(false); setSelectedTest(null); }} color="secondary">סגור</Button>
      </Dialog>
        <Dialog open={openSignatureDialog} onClose={() => setOpenSignatureDialog(false)}>
        <DialogTitle>חתום על המבחן</DialogTitle>
        <DialogContent>
           <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
            onEnd={() => setSignature(true)}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={() => setOpenSignatureDialog(false)}>
              שמור חתימה
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
     
    </div>
  )
}

export default Test
