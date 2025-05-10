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

















// import React, { useState, useEffect } from "react";
// import { useForm, useFieldArray, SubmitHandler, FieldValues } from "react-hook-form";
// import { useDispatch } from "react-redux";
// // import { addTest } from "../store/TestSlice";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Typography, Stack, MenuItem, Card, CardContent } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { useAddMaterialMutation } from "../redux/slice/api/materialsApi";
// import { addVideo } from "../redux/slice/videoSlice";
// import VideoList from "./VideoList";
// import SignatureCanvas from "react-signature-canvas";

// interface IFormInput {
//   TestName: string;
//   LastDate: string;
//   questions: {
//     text: string;
//     answers: string[];
//     correct: number;
//     timeLimit: number;
//   }[];
// }

// const VideoOfMaterial = () => {
//     const dispatch = useDispatch();
//     const [addMaterial] = useAddMaterialMutation();
//     const [openTestDialog, setOpenTestDialog] = useState<boolean>(false);
//     const [openSignatureDialog, setOpenSignatureDialog] = useState<boolean>(false);
//     const [questions, setQuestions] = useState<{ question: string, answers: string[], correctAnswer: number }[]>([
//         { question: "", answers: ["", "", "", ""], correctAnswer: 0 }
//     ]);
//     const [signature, setSignature] = useState<any>(null);
//     const [uploadedCourse, setUploadedCourse] = useState<string | null>(null);
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [finishDate, setFinishDate] = useState<string>("");

//     const urlParts = window.location.pathname.split('/');
//     const courseName = urlParts[urlParts.length - 1];

//     useEffect(() => {
//         setUploadedCourse(courseName);
//     }, [courseName]);

//     const defaultDate = new Date();
//     defaultDate.setFullYear(defaultDate.getFullYear() + 1);
//     const defaultDateString = defaultDate.toISOString().slice(0, 16);

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             setSelectedFile(e.target.files[0]);
//             setFinishDate(defaultDateString);
//         }
//     };

//     const handleUploadVideo = async () => {
//         if (!selectedFile) return;

//         const formData = new FormData();
//         const uploadDate = new Date().toISOString();
        
//         formData.append("video", selectedFile);
//         formData.append("nameCours", courseName);
//         formData.append("uploadDate", uploadDate);
//         formData.append("finishDate", finishDate);
//         formData.append("videoName", selectedFile.name);

//         try {
//             const response = await addMaterial({ formData, nameCours: courseName }).unwrap();
//             if (response) {
//                 dispatch(addVideo(response));
//             } else {
//                 console.error("Failed to upload video: response data not found");
//             }
//         } catch (error) {
//             console.error("Error during video upload:", error);
//         }
//     };

//     const { register, control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
//         defaultValues: {
//             TestName: "",
//             LastDate: "",
//             questions: [
//                 {
//                     text: "",
//                     answers: ["", "", "", ""],
//                     correct: 0,
//                     timeLimit: 30,
//                 },
//             ],
//         },
//     });

//     const { fields, append } = useFieldArray({
//         control,
//         name: "questions",
//     });

//     useEffect(() => {
//         if (fields.length === 0) {
//             append({
//                 text: "",
//                 answers: ["", "", "", ""],
//                 correct: 0,
//                 timeLimit: 30,
//             });
//         }
//     }, [append, fields.length]);

//     const onSubmit: SubmitHandler<IFormInput> = async (data) => {
//         const token = localStorage.getItem("token");
//         const decoded: any = jwtDecode(token!);

//         const testData = {
//             title: data.TestName,
//             lastDate: data.LastDate,
//             questions: data.questions.map((question) => ({
//                 questionText: question.text,
//                 options: question.answers,
//                 correctAnswer: question.answers[question.correct],
//                 timeLimit: parseInt(question.timeLimit.toString())
//             })),
//             teacherId: decoded.userId,
//         };

//         // try {
//         //     const response = await axios.post('http://localhost:8080/Test/createTest', testData);
//         //     dispatch(addTest(response.data));
//         //     setOpenTestDialog(false);
//         //     setOpenSignatureDialog(true);
//         // } catch (error) {
//         //     console.error("Error creating test:", error);
//         // }
//     };

//     const addQuestion = () => {
//         append({
//             text: "",
//             answers: ["", "", "", ""],
//             correct: 0,
//             timeLimit: 30,
//         });
//     };

//     return (
//         <div>
//             <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
//                 Upload Video
//                 <input type="file" onChange={handleFileChange} hidden />
//             </Button>

//             <Button 
//                 variant="contained" 
//                 color="primary" 
//                 onClick={() => setOpenTestDialog(true)} 
//                 sx={{ mt: 3 }}
//             >
//                 יצירת מבחן חדש
//             </Button>

//             {uploadedCourse && <VideoList courseName={uploadedCourse} />}

//             <Dialog
//     open={openTestDialog}
//     onClose={() => setOpenTestDialog(false)}
//     maxWidth="lg"  // הגדל את רוחב הדיאלוג
//     fullWidth={true}  // הפוך את הדיאלוג לרוחב מלא בתוך המסך
// >
//     <DialogTitle>יצירת מבחן חדש</DialogTitle>
//     <DialogContent>
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <Stack spacing={2}>
//                 <TextField
//                     label="שם מבחן"
//                     {...register("TestName", { required: true })}
//                     error={!!errors.TestName}
//                     helperText={errors.TestName && "שדה חובה"}
//                 />

//                 <TextField
//                     label="תאריך אחרון להגשה"
//                     type="datetime-local"
//                     InputLabelProps={{ shrink: true }}
//                     {...register("LastDate", { required: true })}
//                     error={!!errors.LastDate}
//                     helperText={errors.LastDate && "שדה חובה"}
//                 />

//                 <Typography variant="h5" mt={4}>
//                     שאלות
//                 </Typography>

//                 {fields.map((field, index) => (
//                     <Card key={field.id} variant="outlined" sx={{ mt: 2 }}>
//                         <CardContent>
//                             <Stack spacing={2}>
//                                 <TextField
//                                     label={`שאלה ${index + 1}`}
//                                     {...register(`questions.${index}.text`, { required: true })}
//                                     error={!!errors.questions?.[index]?.text}
//                                     helperText={errors.questions?.[index]?.text && "שדה חובה"}
//                                 />

//                                 {Array(4).fill(0).map((_, ansIndex) => (
//                                     <TextField
//                                         key={ansIndex}
//                                         label={`תשובה ${ansIndex + 1}`}
//                                         {...register(`questions.${index}.answers.${ansIndex}`, { required: true })}
//                                         error={!!errors.questions?.[index]?.answers?.[ansIndex]}
//                                         helperText={errors.questions?.[index]?.answers?.[ansIndex] && "שדה חובה"}
//                                     />
//                                 ))}

//                                 <TextField
//                                     select
//                                     label="בחר תשובה נכונה"
//                                     defaultValue={field.correct}
//                                     {...register(`questions.${index}.correct`, { required: true })}
//                                 >
//                                     {[0, 1, 2, 3].map((opt) => (
//                                         <MenuItem key={opt} value={opt}>
//                                             תשובה {opt + 1}
//                                         </MenuItem>
//                                     ))}
//                                 </TextField>

//                                 <TextField
//                                     label="הגבלת זמן לשאלה (שניות)"
//                                     type="number"
//                                     {...register(`questions.${index}.timeLimit`, { required: true })}
//                                     error={!!errors.questions?.[index]?.timeLimit}
//                                     helperText={errors.questions?.[index]?.timeLimit && "שדה חובה"}
//                                 />
//                             </Stack>
//                         </CardContent>
//                     </Card>
//                 ))}

//                 <Button variant="outlined" onClick={addQuestion}>הוסף שאלה</Button>
//                 <Button type="submit" variant="contained" color="primary">שמור מבחן</Button>
//             </Stack>
//         </form>
//     </DialogContent>
// </Dialog>


//             <Dialog open={openSignatureDialog} onClose={() => setOpenSignatureDialog(false)}>
//                 <DialogTitle>חתום על המבחן</DialogTitle>
//                 <DialogContent>
//                     <SignatureCanvas
//                         penColor="black"
//                         canvasProps={{ width: 400, height: 200, className: "signature-canvas" }}
//                         onEnd={() => setSignature(signature.current?.getTrimmedCanvas())}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenSignatureDialog(false)} color="secondary">ביטול</Button>
//                     <Button onClick={() => { console.log("Teacher's signature:", signature); setOpenSignatureDialog(false); }} color="primary">סיים</Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default VideoOfMaterial;





import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Typography, Stack, MenuItem, Card, CardContent } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAddMaterialMutation } from "../redux/slice/api/materialsApi";
import { addVideo } from "../redux/slice/videoSlice";
import VideoList from "./VideoList";
import SignatureCanvas from "react-signature-canvas";
import { addTest } from "../redux/slice/testSlice";

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
  const [openTestDialog, setOpenTestDialog] = useState<boolean>(false);
  const [openSignatureDialog, setOpenSignatureDialog] = useState<boolean>(false);
  const [questions, setQuestions] = useState<{ question: string, answers: string[], correctAnswer: number }[]>([
    { question: "", answers: ["", "", "", ""], correctAnswer: 0 }
  ]);
  const [signature, setSignature] = useState<any>(null);
  const [uploadedCourse, setUploadedCourse] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [finishDate, setFinishDate] = useState<string>("");

  const urlParts = window.location.pathname.split('/');
  const courseName = urlParts[urlParts.length - 1];

  useEffect(() => {
    setUploadedCourse(courseName);
  }, [courseName]);

  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() + 1);
  const defaultDateString = defaultDate.toISOString().slice(0, 16);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFinishDate(defaultDateString);
    }
  };

  const handleUploadVideo = async () => {
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
      } else {
        console.error("Failed to upload video: response data not found");
      }
    } catch (error) {
      console.error("Error during video upload:", error);
    }
  };

  const { register, control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      TestName: "",
      LastDate: "",
      questions: [
        {
          text: "",
          answers: ["", "", "", ""],
          correct: 0,
          timeLimit: 30,
        },
      ],
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const token = localStorage.getItem("token");
    const decoded: any = jwtDecode(token!);

    const testData = {
      title: data.TestName,
      lastDate: data.LastDate,
      questions: data.questions.map((question) => ({
        questionText: question.text,
        options: question.answers,
        correctAnswer: question.answers[question.correct],
        timeLimit: parseInt(question.timeLimit.toString())
      })),
      teacherId: decoded.userId,
    };

    try {
      const response = await addTest(testData).unwrap();
      dispatch(addTest(response));
      setOpenTestDialog(false);
      setOpenSignatureDialog(true);
    } catch (error) {
      console.error("Error creating test:", error);
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
    <div>
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload Video
        <input type="file" onChange={handleFileChange} hidden />
      </Button>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpenTestDialog(true)} 
        sx={{ mt: 3 }}
      >
        יצירת מבחן חדש
      </Button>

      {uploadedCourse && <VideoList courseName={uploadedCourse} />}

      <Dialog
        open={openTestDialog}
        onClose={() => setOpenTestDialog(false)}
        maxWidth="lg"
        fullWidth={true}
      >
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
                label="תאריך אחרון להגשה"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                {...register("LastDate", { required: true })}
                error={!!errors.LastDate}
                helperText={errors.LastDate && "שדה חובה"}
              />

              <Typography variant="h5" mt={4}>
                שאלות
              </Typography>

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
                        label="בחר תשובה נכונה"
                        defaultValue={field.correct}
                        {...register(`questions.${index}.correct`, { required: true })}
                      >
                        {[0, 1, 2, 3].map((opt) => (
                          <MenuItem key={opt} value={opt}>
                            תשובה {opt + 1}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        label="הגבלת זמן לשאלה (שניות)"
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

      <Dialog open={openSignatureDialog} onClose={() => setOpenSignatureDialog(false)}>
        <DialogTitle>חתום על המבחן</DialogTitle>
        <DialogContent>
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 400, height: 200, className: "signature-canvas" }}
            onEnd={() => setSignature(signature.current?.getTrimmedCanvas())}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSignatureDialog(false)} color="secondary">ביטול</Button>
          <Button onClick={() => { console.log("Teacher's signature:", signature); setOpenSignatureDialog(false); }} color="primary">סיים</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VideoOfMaterial;
