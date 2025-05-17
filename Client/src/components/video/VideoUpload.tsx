// // import { useState, ChangeEvent } from 'react';
// // import {
// //   Button,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   TextField,
// // } from '@mui/material';
// // import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// // import { useUpDateMaterialMutation } from '../../redux/slice/api/materialsApi';
// // import { useAppSelector, useAppDispatch } from '../../redux/hook';
// // import { addVideo } from '../../redux/slice/videoSlice';
// // const VideoUpload = () => {
// //   const dispatch = useAppDispatch();
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const [openUploadDialog, setOpenUploadDialog] = useState(false);
// //   const [finishDate, setFinishDate] = useState('');
// //   const [uploadVideo, { isLoading }] = useUpDateMaterialMutation();
// //   const selectedCourse = useAppSelector((state) => state.videos.uploadedVideo);

// //   const defaultDateString = new Date().toISOString().slice(0, 16);

// //   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files[0]) {
// //       setSelectedFile(e.target.files[0]);
// //       setOpenUploadDialog(true);
// //       setFinishDate(defaultDateString);
// //     }
// //   };

// //   const handleUpload = async () => {
// //     if (!selectedFile || !selectedCourse) return;

// //     const formData = new FormData();
// //     formData.append('video', selectedFile);
// //     formData.append('nameCours', selectedCourse.nameCours);
// //     formData.append('uploadDate', new Date().toISOString());
// //     formData.append('finishDate', finishDate);
// //     formData.append('videoName', selectedFile.name);

// //     try {
// //       const response = await uploadVideo(formData).unwrap();

// //       if (response) {
// //         dispatch(addVideo(response));
// //         setOpenUploadDialog(false);
// //         setSelectedFile(null);
// //       } else {
// //         console.error('Video upload failed');
// //       }
// //     } catch (error) {
// //       console.error('Error uploading video:', error);
// //     }
// //   };

// //   return (
// //     <>
// //       <Button
// //         component="label"
// //         variant="contained"
// //         startIcon={<CloudUploadIcon />}
// //       >
// //         העלאת סרטון
// //         <input
// //           type="file"
// //           accept="video/*"
// //           onChange={handleFileChange}
// //           hidden
// //         />
// //       </Button>

// //       <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)}>
// //         <DialogTitle>בחר תאריך ושעה עד מתי הסרטון יהיה זמין</DialogTitle>
// //         <DialogContent>
// //           <TextField
// //             fullWidth
// //             type="datetime-local"
// //             value={finishDate}
// //             onChange={(e) => setFinishDate(e.target.value)}
// //             required
// //           />
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setOpenUploadDialog(false)} color="secondary">
// //             ביטול
// //           </Button>
// //           <Button onClick={handleUpload} color="primary" disabled={isLoading}>
// //             {isLoading ? 'מעלה...' : 'העלאה'}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </>
// //   );
// // };

// // export default VideoUpload;




// // components/VideoUpload.tsx
// import { useState } from "react";
// import { useAddMaterialMutation } from "../../redux/slice/api/materialsApi";
// import { useDispatch } from "react-redux";
// import { addVideo } from "../../redux/slice/videoSlice";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";

// interface Props {
//   courseName: string;
// }

// const VideoUpload = ({ courseName }: Props) => {
//   const [file, setFile] = useState<File | null>(null);
//   const [videoName, setVideoName] = useState("");
//   const [upload] = useAddMaterialMutation();
//   const dispatch = useDispatch();

//   const handleUpload = async () => {
//     if (!file || !videoName) return;
//     const formData = new FormData();
//     formData.append("video", file);
//     formData.append("videoName", videoName);
//     formData.append("nameCours", courseName);

//     try {
//       const response = await upload({ formData, nameCours: courseName }).unwrap();
//       dispatch(addVideo(response));
//       setFile(null);
//       setVideoName("");
//     } catch (error) {
//       console.error("Upload error:", error);
//     }
//   };

//   return (
//     <div>
//       <TextField
//         label="Video Name"
//         value={videoName}
//         onChange={(e) => setVideoName(e.target.value)}
//         variant="outlined"
//         fullWidth
//         sx={{ mb: 2 }}
//       />
//       <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
//       <Button onClick={handleUpload} variant="contained" sx={{ mt: 2 }}>
//         Upload Video
//       </Button>
//     </div>
//   );
// };

// export default VideoUpload;






import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import { useAddMaterialMutation } from "../../redux/slice/api/materialsApi";
import { useDispatch } from "react-redux";
import { addVideo } from "../../redux/slice/videoSlice";
import VideoList from "./VideoList";
import { Video } from "../../interface/VideoMaterial";


const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [finishDate, setFinishDate] = useState<string>("");
  const [uploadedCourse, setUploadedCourse] = useState<string | null>(null);////להפוך לstate global
  const [addMaterial] = useAddMaterialMutation();
  const dispatch = useDispatch();
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() + 1);
  const defaultDateString = defaultDate.toISOString().slice(0, 16);
  const urlParts = window.location.pathname.split('/');
  const courseName = urlParts[urlParts.length - 1];
    useEffect(() => {
    setUploadedCourse(courseName);
    }, [courseName]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setOpenUploadDialog(true);
      setFinishDate(defaultDateString);
    }};

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
    const response: Video = await addMaterial({
      formData,
      nameCours: courseName
    }).unwrap();

    if (response) {
      // כאן אנחנו מניחים שתגובה היא אובייקט מסוג Video
      dispatch(addVideo(response)); // עדכון Redux עם הווידאו החדש
      setOpenUploadDialog(false);
      setSelectedFile(null);
    } else {
      console.error("No response from server");
    }
  } catch (error: any) {
    console.error("Error uploading video:", error);

    if (error.message) {
      alert(`Error: ${error.message}`);
    }
  }
};

    return (
    <div>
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        העלאת סרטון
        <input type="file" className="hidden-input" accept="video/*" onChange={handleFileChange} hidden />
      </Button>
       {uploadedCourse && <VideoList courseName={uploadedCourse} />}
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
    </div>
  )
}

export default VideoUpload
