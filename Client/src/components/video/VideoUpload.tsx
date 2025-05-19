
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
