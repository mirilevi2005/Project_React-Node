// import { useState, ChangeEvent, useEffect } from "react";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { useDispatch } from "react-redux";
// import "../css/VideoOfMaterial.css";
// import { useAddMaterialMutation } from "../redux/slice/api/materialsApi";
// import { addVideo } from "../redux/slice/videoSlice";
// import VideoList from "./VideoList";

// const VideoOfMaterial = () => {
//     const dispatch = useDispatch();
//     const [addMaterial] = useAddMaterialMutation();
//     const [open, setOpen] = useState(false);
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [finishDate, setFinishDate] = useState<string>("");
//     const [uploadedCourse, setUploadedCourse] = useState<string | null>(null);
//     const urlParts = window.location.pathname.split('/');
//     const courseName = urlParts[urlParts.length - 1]; 
   

//     useEffect(() => {
//         setUploadedCourse(courseName); // עדכון סטייט בצורה תקינה
//     }, [courseName]);

//     // תאריך ברירת מחדל - שנה מהיום
//     const defaultDate = new Date();
//     defaultDate.setFullYear(defaultDate.getFullYear() + 1);
//     const defaultDateString = defaultDate.toISOString().slice(0, 16);

//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             setSelectedFile(e.target.files[0]);
//             setOpen(true);
//             setFinishDate(defaultDateString);
//         }
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedFile(null);
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) return;

//         const formData = new FormData();
//         const uploadDate = new Date().toISOString();
       
        
//         formData.append("video", selectedFile);
//         formData.append("nameCours", courseName);
//         formData.append("uploadDate", uploadDate);
//         formData.append("finishDate", finishDate);
//         formData.append("videoName", selectedFile.name);

//         try {
//             console.log("Final API URL:", `http://localhost:8080/HomeLacturer/${courseName}`);
//             console.log("Course Name:", courseName);
//             console.log("FormData:", formData);
//             const response = await addMaterial({ formData, nameCours: courseName }).unwrap();
            
//             console.log("Response:", response);
//             if (response) {
//                 dispatch(addVideo(response));
//                 handleClose();
//             } else {
//                 console.error("Failed to upload video: response data not found");
//             }
        
//         } catch (error) {
//             console.error("Error during video upload:", error);
//         }
//     };

//     return (
//         <div className="upload-container">
//             <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
//                 Upload Video
//                 <input type="file" className="hidden-input" accept="video/*" onChange={handleFileChange} hidden />
//             </Button>

//             {/* הצגת רשימת הסרטונים רק כאשר יש שם קורס */}
//             {uploadedCourse && <VideoList courseName={uploadedCourse} />}

//             {/* Pop-Up בחירת תאריך */}
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>בחר תאריך ושעה עד מתי הסרטון יהיה זמין</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         fullWidth
//                         type="datetime-local"
//                         value={finishDate}
//                         onChange={(e) => setFinishDate(e.target.value)}
//                         required
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="secondary">ביטול</Button>
//                     <Button onClick={handleUpload} color="primary">העלאה</Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default VideoOfMaterial;









import React, { useState, useEffect, ChangeEvent } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Box, Typography, Stack, MenuItem, Card, CardContent
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SignatureCanvas from "react-signature-canvas";
import "../css/VideoOfMaterial.css";
import { useAddMaterialMutation, useGetAllMaterialsByNameCourseQuery } from "../redux/slice/api/materialsApi";
import { addVideo } from "../redux/slice/videoSlice";
import { useCreateTestMutation, useGetTestsByCourseQuery } from "../redux/slice/api/testApi"; // להוסיף את הקריאה ל-API של המבחנים
import VideoList from "./VideoList";

interface IFormInput {
  TestName: string;
  LastDate: string;
  questions: {
    text: string;
    answers: string[];
    correct: number;
    timeLimit: number;
  }[];
}

const VideoOfMaterial: React.FC = () => {
  const dispatch = useDispatch();
  const [addMaterial] = useAddMaterialMutation();
  const [createTest] = useCreateTestMutation();

  const [cookies] = useCookies(['token', 'userId']);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const [openSignatureDialog, setOpenSignatureDialog] = useState(false);
  const [openTestsDialog, setOpenTestsDialog] = useState(false); // Dialog למבחנים
  const [signature, setSignature] = useState<any>(null);
  const [uploadedCourse, setUploadedCourse] = useState<string | null>(null);
  const [finishDate, setFinishDate] = useState<string>("");

  const urlParts = window.location.pathname.split('/');
  const courseName = urlParts[urlParts.length - 1];

  useEffect(() => {
    setUploadedCourse(courseName);
  }, [courseName]);

  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() + 1);
  const defaultDateString = defaultDate.toISOString().slice(0, 16);

  // Form setup for test
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

  // קריאה ל-API לקבלת כל המבחנים לפי שם הקורס
  const { data } = useGetTestsByCourseQuery(courseName);
  const testList = data?.tests ?? [];


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setOpenUploadDialog(true);
      setFinishDate(defaultDateString);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    const uploadDate = new Date().toISOString();

    formData.append("video", selectedFile);
    formData.append("nameCours", courseName);
    formData.append("uploadDate", uploadDate);
    formData.append("finishDate", finishDate);
    formData.append("videoName", selectedFile.name);

    try {
      const response = await addMaterial({ formData, nameCours: courseName }).unwrap();
      if (response) {
        dispatch(addVideo(response));
        setOpenUploadDialog(false);
        setSelectedFile(null);
      } else {
        console.error("Video upload failed");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
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

  const addQuestion = () => {
    append({
      text: "",
      answers: ["", "", "", ""],
      correct: 0,
      timeLimit: 30,
    });
  };

  return (
    <div className="upload-container">
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        העלאת סרטון
        <input type="file" className="hidden-input" accept="video/*" onChange={handleFileChange} hidden />
      </Button>

      <Button variant="outlined" color="primary" onClick={() => setOpenTestDialog(true)} sx={{ ml: 2 }}>
        צור מבחן
      </Button>

      <Button variant="outlined" color="primary" onClick={() => setOpenTestsDialog(true)} sx={{ ml: 2 }}>
        הצגת מבחנים
      </Button>

      {uploadedCourse && <VideoList courseName={uploadedCourse} />}

      {/* Upload Dialog */}
      <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)}>
        <DialogTitle>בחר תאריך ושעה עד מתי הסרטון יהיה זמין</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="datetime-local"
            value={finishDate}
            onChange={(e) => setFinishDate(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUploadDialog(false)} color="secondary">ביטול</Button>
          <Button onClick={handleUpload} color="primary">העלאה</Button>
        </DialogActions>
      </Dialog>

      {/* Test Creation Dialog */}
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
      </Dialog>

      {/* Tests Dialog */}
      <Dialog open={openTestsDialog} onClose={() => setOpenTestsDialog(false)} maxWidth="lg" fullWidth>
        {testList.length > 0 ? (
  <Stack spacing={2}>
    {testList.map((test) => (
      <Card key={test._id} variant="outlined">
        <CardContent>
          <Typography variant="h6">{test.title}</Typography>
          <Typography>תאריך אחרון: {new Date(test.lastDate).toLocaleString()}</Typography>
        </CardContent>
      </Card>
    ))}
  </Stack>
) : (
  <Typography>לא נמצאו מבחנים בקורס זה.</Typography>
)}

        <DialogActions>
          <Button onClick={() => setOpenTestsDialog(false)} color="secondary">סגור</Button>
        </DialogActions>
      </Dialog>

      {/* Signature Dialog */}
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
  );
};

export default VideoOfMaterial;
