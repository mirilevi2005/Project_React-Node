import React, { ChangeEvent, useEffect, useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField,
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Alert,
  LinearProgress,
  Divider,
  Stack
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAddMaterialMutation } from '../../redux/slice/api/materialsApi';
import { useDispatch } from 'react-redux';
import { addVideo } from '../../redux/slice/videoSlice';
import VideoList from './VideoList';
import { Video } from '../../interface/VideoMaterial';

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openUploadDialog, setOpenUploadDialog] = useState<boolean>(false);
  const [finishDate, setFinishDate] = useState<string>('');
  const [uploadedCourse, setUploadedCourse] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>('');
  
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
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadSuccess(null);
    setUploadMessage('');

    const formData = new FormData();
    const uploadDate = new Date().toISOString();

    formData.append('video', selectedFile);
    formData.append('nameCours', courseName);
    formData.append('uploadDate', uploadDate);
    formData.append('finishDate', finishDate);
    formData.append('videoName', selectedFile.name);

    try {
      const response: Video = await addMaterial({
        formData,
        nameCours: courseName
      }).unwrap();

      if (response) {
        dispatch(addVideo(response));
        setOpenUploadDialog(false);
        setSelectedFile(null);
        setUploadSuccess(true);
        setUploadMessage('הסרטון הועלה בהצלחה!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setUploadSuccess(null);
          setUploadMessage('');
        }, 3000);
      } else {
        setUploadSuccess(false);
        setUploadMessage('לא התקבלה תשובה מהשרת');
      }
    } catch (error: any) {
      console.error('Error uploading video:', error);
      setUploadSuccess(false);
      setUploadMessage(error.message ? `שגיאה: ${error.message}` : 'אירעה שגיאה בהעלאת הסרטון');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Paper elevation={0} sx={{ p: 3, backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button 
            component="label" 
            variant="contained" 
            startIcon={<CloudUploadIcon />}
            sx={{ py: 1.2, px: 3 }}
          >
            העלאת סרטון
            <input 
              type="file" 
              className="hidden-input" 
              accept="video/*" 
              onChange={handleFileChange} 
              hidden 
            />
          </Button>
          <Typography variant="body1">
            העלו סרטון חדש לקורס על ידי לחיצה על הכפתור
          </Typography>
        </Stack>
      </Paper>
      
      {uploadSuccess !== null && (
        <Alert 
          severity={uploadSuccess ? 'success' : 'error'} 
          sx={{ mb: 3 }}
        >
          {uploadMessage}
        </Alert>
      )}

      {uploadedCourse && (
        <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              סרטוני הקורס
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <VideoList courseName={uploadedCourse} />
          </CardContent>
        </Card>
      )}

      <Dialog 
        open={openUploadDialog} 
        onClose={() => setOpenUploadDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>הגדרות העלאת הסרטון</DialogTitle>
        <DialogContent dividers>
          {selectedFile && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                שם הקובץ: {selectedFile.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                גודל: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </Typography>
            </Box>
          )}
          
          <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
            בחר תאריך ושעה עד מתי הסרטון יהיה זמין לצפייה עבור התלמידים:
          </Typography>
          
          <TextField
            fullWidth
            type="datetime-local"
            value={finishDate}
            onChange={(e) => setFinishDate(e.target.value)}
            required
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          
          {isUploading && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress />
              <Typography variant="caption" sx={{ mt: 1 }}>
                מעלה את הסרטון, אנא המתן...
              </Typography>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={() => setOpenUploadDialog(false)} 
            color="inherit"
            disabled={isUploading}
          >
            ביטול
          </Button>
          <Button 
            onClick={handleUpload} 
            color="primary" 
            variant="contained"
            disabled={isUploading}
          >
            העלאה
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VideoUpload;