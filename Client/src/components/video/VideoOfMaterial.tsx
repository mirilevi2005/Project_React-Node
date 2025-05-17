import { Box, Button } from '@mui/material';
import VideoUpload from './VideoUpload';
import Test from './Test';
import { useState } from 'react';

const VideoOfMaterial = () => {
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const handleShow=()=>{
     setShowVideoUpload(true);
  }
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {!showVideoUpload ? (
        <Button variant="contained" onClick={handleShow}>
          להצגת סרטונים
        </Button>
      ) : (
        <VideoUpload />
      )}
    <Test/>
    </Box>
  );
};

export default VideoOfMaterial;
