import { useState, ChangeEvent, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch } from "react-redux";
import "../css/VideoOfMaterial.css";
import { useAddMaterialMutation } from "../redux/slice/api/materialsApi";
import { addVideo } from "../redux/slice/slice";
import VideoList from "./VideoList";

const VideoOfMaterial = () => {
    const dispatch = useDispatch();
    const [addMaterial] = useAddMaterialMutation();
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [finishDate, setFinishDate] = useState<string>("");
    const [uploadedCourse, setUploadedCourse] = useState<string | null>(null);
    const urlParts = window.location.pathname.split('/');
    const courseName = urlParts[urlParts.length - 1]; 
   

    useEffect(() => {
        setUploadedCourse(courseName); // עדכון סטייט בצורה תקינה
    }, [courseName]);

    // תאריך ברירת מחדל - שנה מהיום
    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() + 1);
    const defaultDateString = defaultDate.toISOString().slice(0, 16);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setOpen(true);
            setFinishDate(defaultDateString);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        const uploadDate = new Date().toISOString();
        const finishDate = '2025-12-31';
        
        formData.append("video", selectedFile);
        formData.append("nameCours", courseName);
        formData.append("uploadDate", uploadDate);
        formData.append("finishDate", finishDate);
        formData.append("videoName", selectedFile.name);

        try {
            console.log("Final API URL:", `http://localhost:8080/HomeLacturer/${courseName}`);
            console.log("Course Name:", courseName);
            console.log("FormData:", formData);
            const response = await addMaterial({ formData, nameCours: courseName }).unwrap();
            
            console.log("Response:", response);
            if (response) {
                dispatch(addVideo(response));
                handleClose();
            } else {
                console.error("Failed to upload video: response data not found");
            }
        
        } catch (error) {
            console.error("Error during video upload:", error);
        }
    };

    return (
        <div className="upload-container">
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload Video
                <input type="file" className="hidden-input" accept="video/*" onChange={handleFileChange} hidden />
            </Button>

            {/* הצגת רשימת הסרטונים רק כאשר יש שם קורס */}
            {uploadedCourse && <VideoList courseName={uploadedCourse} />}

            {/* Pop-Up בחירת תאריך */}
            <Dialog open={open} onClose={handleClose}>
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
                    <Button onClick={handleClose} color="secondary">ביטול</Button>
                    <Button onClick={handleUpload} color="primary">העלאה</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default VideoOfMaterial;
