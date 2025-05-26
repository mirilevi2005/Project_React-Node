
// import { useState } from "react";
// import Stack from "@mui/material/Stack";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import TextField from "@mui/material/TextField";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
// import { useDispatch } from "react-redux";
// import {
//   useDeleteMaterialMutation,
//   useGetAllMaterialsByNameCourseQuery,
//   useUpDateMaterialMutation,
// } from "../../redux/slice/api/materialsApi";
// import { deleteVideo } from "../../redux/slice/videoSlice";
// import { Video } from "../../interface/VideoMaterial";

// interface Props {
//   courseName: string;
// }

// const VideoList = ({ courseName }: Props) => {
//   const { data, isError, isLoading, refetch } = useGetAllMaterialsByNameCourseQuery(courseName);
// console.log("courseName:", courseName);
// console.log("data:", data);
// console.log("error:", isError);

//   const [deleteMaterial] = useDeleteMaterialMutation();
//   const [upDateMaterial] = useUpDateMaterialMutation();
//   const dispatch = useDispatch();
//   const videos = data?.videos || [];

//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editedName, setEditedName] = useState("");

//   const handleDelete = async (videoId: string) => {
//     try {
//       await deleteMaterial(videoId).unwrap();
//       dispatch(deleteVideo(videoId));
//       refetch();
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     }
//   };

//   const handleEdit = (video: Video) => {
//     setEditingId(video._id);
//     setEditedName(video.videoName);
//   };

//   const handleSave = async (video: Video) => {
//     const formData = new FormData();
//     formData.append("videoName", editedName);
//     formData.append("nameCours", courseName);
//     formData.append("_id", video._id); // חובה לשלוח ID לעדכון

//     try {
//       await upDateMaterial(formData).unwrap();
//       setEditingId(null);
//       refetch();
//     } catch (error) {
//       console.error("Error updating video name:", error);
//     }
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditedName("");
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error loading videos.</p>;
//   if (videos.length === 0) return <p>No videos available</p>;

//   return (
//     <div className="video-list">
//       {videos.map((video) => (
//         <div key={video._id} className="video-item" style={{ marginBottom: "24px" }}>
//           {editingId === video._id ? (
//             <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
//               <TextField
//                 value={editedName}
//                 onChange={(e) => setEditedName(e.target.value)}
//                 variant="standard"
//               />
//               <IconButton onClick={() => handleSave(video)} aria-label="save">
//                 <CheckIcon />
//               </IconButton>
//               <IconButton onClick={handleCancel} aria-label="cancel">
//                 <CloseIcon />
//               </IconButton>
//             </Stack>
//           ) : (
//             <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
//               <h3>{video.videoName}</h3>
//               <IconButton onClick={() => handleEdit(video)} aria-label="edit">
//                 <EditIcon />
//               </IconButton>
//             </Stack>
//           )}

//           <video width="600" controls>
//             <source
//               src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`}
//               type="video/mp4"
//             />
//             הדפדפן שלך לא תומך בווידאו.
//           </video>

//           <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1 }}>
//             <IconButton onClick={() => handleDelete(video._id)} aria-label="delete" size="large">
//               <DeleteIcon />
//             </IconButton>
//           </Stack>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VideoList;



// import React, { useState } from 'react';
// import {
//   Stack,
//   IconButton,
//   TextField,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardActions,
//   Divider,
//   Grid,
//   CircularProgress,
//   Alert,
//   Chip
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import { useDispatch } from 'react-redux';
// import {
//   useDeleteMaterialMutation,
//   useGetAllMaterialsByNameCourseQuery,
//   useUpDateMaterialMutation,
// } from '../../redux/slice/api/materialsApi';
// import { deleteVideo } from '../../redux/slice/videoSlice';
// import { Video } from '../../interface/VideoMaterial';

// interface Props {
//   courseName: string;
// }

// const VideoList: React.FC<Props> = ({ courseName }) => {
//   const { data, isError, isLoading, refetch } = useGetAllMaterialsByNameCourseQuery(courseName);
  
//   const [deleteMaterial] = useDeleteMaterialMutation();
//   const [upDateMaterial] = useUpDateMaterialMutation();
//   const dispatch = useDispatch();
//   const videos = data?.videos || [];

//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editedName, setEditedName] = useState('');
//   const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

//   const handleDelete = async (videoId: string) => {
//     if (!window.confirm('האם אתה בטוח שברצונך למחוק את הסרטון?')) {
//       return;
//     }
    
//     try {
//       await deleteMaterial(videoId).unwrap();
//       dispatch(deleteVideo(videoId));
//       refetch();
//     } catch (error) {
//       console.error('Error deleting video:', error);
//     }
//   };

//   const handleEdit = (video: Video) => {
//     setEditingId(video._id);
//     setEditedName(video.videoName);
//   };

//   const handleSave = async (video: Video) => {
//     const formData = new FormData();
//     formData.append('videoName', editedName);
//     formData.append('nameCours', courseName);
//     formData.append('_id', video._id);

//     try {
//       await upDateMaterial(formData).unwrap();
//       setEditingId(null);
//       refetch();
//     } catch (error) {
//       console.error('Error updating video name:', error);
//     }
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditedName('');
//   };

//   const toggleExpandVideo = (videoId: string) => {
//     if (expandedVideo === videoId) {
//       setExpandedVideo(null);
//     } else {
//       setExpandedVideo(videoId);
//     }
//   };

//   const formatDate = (dateString: string | Date) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('he-IL', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (isLoading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (isError) {
//     return (
//       <Alert severity="error" sx={{ my: 2 }}>
//         שגיאה בטעינת הסרטונים. אנא נסה שוב מאוחר יותר.
//       </Alert>
//     );
//   }

//   if (videos.length === 0) {
//     return (
//       <Alert severity="info" sx={{ my: 2 }}>
//         אין סרטונים זמינים בקורס זה.
//       </Alert>
//     );
//   }

//   return (
//     <Grid container spacing={3}>
//       {videos.map((video) => (
//         <Grid item xs={12} key={video._id}>
//           <Card 
//             variant="outlined" 
//             sx={{ 
//               borderRadius: 2,
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
//               }
//             }}
//           >
//             <CardContent>
//               {editingId === video._id ? (
//                 <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
//                   <TextField
//                     value={editedName}
//                     onChange={(e) => setEditedName(e.target.value)}
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                     autoFocus
//                   />
//                   <IconButton onClick={() => handleSave(video)} color="primary" aria-label="save">
//                     <CheckIcon />
//                   </IconButton>
//                   <IconButton onClick={handleCancel} color="error" aria-label="cancel">
//                     <CloseIcon />
//                   </IconButton>
//                 </Stack>
//               ) : (
//                 <Stack 
//                   direction="row" 
//                   spacing={1} 
//                   sx={{ 
//                     alignItems: 'center', 
//                     justifyContent: 'space-between',
//                     mb: 2
//                   }}
//                 >
//                   <Box>
//                     <Typography variant="h6" component="h3">
//                       {video.videoName}
//                     </Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
//                       <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
//                       <Typography variant="caption" color="text.secondary">
//                         זמין עד: {formatDate(video.finishDate)}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Box>
//                     <IconButton onClick={() => handleEdit(video)} aria-label="edit" size="small">
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                     <IconButton onClick={() => handleDelete(video._id)} aria-label="delete" size="small" color="error">
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                     <IconButton onClick={() => toggleExpandVideo(video._id)} aria-label="view" size="small" color="primary">
//                       <VisibilityIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 </Stack>
//               )}

//               {expandedVideo === video._id && (
//                 <Box sx={{ mt: 2 }}>
//                   <Divider sx={{ mb: 2 }} />
//                   <Box 
//                     sx={{ 
//                       position: 'relative',
//                       paddingTop: '56.25%', // 16:9 aspect ratio
//                       backgroundColor: '#000',
//                       borderRadius: 1,
//                       overflow: 'hidden'
//                     }}
//                   >
//                     <Box 
//                       component="video"
//                       sx={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%'
//                       }}
//                       controls
//                     >
//                       <source
//                         src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`}
//                         type="video/mp4"
//                       />
//                       הדפדפן שלך לא תומך בווידאו.
//                     </Box>
//                   </Box>
//                 </Box>
//               )}
//             </CardContent>
//             {/* {expandedVideo !== video._id && (
//               <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
//                 <Chip 
//                   label="לחץ לצפייה" 
//                   color="primary" 
//                   variant="outlined" 
//                   size="small" 
//                   icon={<VisibilityIcon />} 
//                   onClick={() => toggleExpandVideo(video._id)}
//                 />
//               </CardActions>
//             )} */}
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default VideoList;








import React, { useState } from 'react';
import {
  Stack,
  IconButton,
  TextField,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import {
  useDeleteMaterialMutation,
  useGetAllMaterialsByNameCourseQuery,
  useUpDateMaterialMutation
} from '../../redux/slice/api/materialsApi';
import { deleteVideo } from '../../redux/slice/videoSlice';
import { Video } from '../../interface/VideoMaterial';

interface Props {
  courseName: string;
}

const VideoList = ({ courseName }:Props) => {
  const { data, isError, isLoading, refetch } = useGetAllMaterialsByNameCourseQuery(courseName);
  const [deleteMaterial] = useDeleteMaterialMutation();
  const [upDateMaterial] = useUpDateMaterialMutation();
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);


  const videos = data?.videos || [];

  const formatDate = (dateString: string | Date) =>
    new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });


  const handleDelete = async (id: string) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את הסרטון?')) {
      try {
        await deleteMaterial(id).unwrap();
        dispatch(deleteVideo(id));
        refetch();
      } catch (err) {
        console.error('Error deleting video:', err);
      }
    }
  };

  const handleEdit = (video: Video) => {
    setEditingId(video._id);
    setEditedName(video.videoName);
  };

  const handleSave = async (video: Video) => {
    const formData = new FormData();
    formData.append('videoName', editedName);
    formData.append('nameCours', courseName);
    formData.append('_id', video._id);

    try {
      await upDateMaterial(formData).unwrap();
      setEditingId(null);
      refetch();
    } catch (err) {
      console.error('Error updating video:', err);
    }
  };

  const toggleExpandVideo = (video: Video) => {
    // if (!isVideoValid(video.finishDate)) return;
    setExpandedVideo(prev => (prev === video._id ? null : video._id));
  };

  // const toggleExpandVideo = (video: Video) => {
  // if (!isVideoValid(video.finishDate)) {
  //   setExpiredDialog(true);
  //   return;
  // }
  // setExpandedVideo(prev => (prev === video._id ? null : video._id));
// };


  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
  }

  if (isError) {
    return <Alert severity="error" sx={{ my: 2 }}>שגיאה בטעינת הסרטונים. נסה שוב מאוחר יותר.</Alert>;
  }

  if (videos.length === 0) {
    return <Alert severity="info" sx={{ my: 2 }}>אין סרטונים זמינים בקורס זה.</Alert>;
  }

  return (
    <Grid container spacing={3}>
      {videos.map(video => (
        <Grid item xs={12} key={video._id}>
          <Card variant="outlined" sx={{
            borderRadius: 2,
            transition: '0.3s',
            '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }
          }}>
            <CardContent>
              {editingId === video._id ? (
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <TextField
                    value={editedName}
                    onChange={e => setEditedName(e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    autoFocus
                  />
                  <IconButton onClick={() => handleSave(video)} color="primary"><CheckIcon /></IconButton>
                  <IconButton onClick={() => setEditingId(null)} color="error"><CloseIcon /></IconButton>
                </Stack>
              ) : (
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" mb={2}>
                  <Box>
                    <Typography variant="h6">{video.videoName}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary">
                        זמין עד: {formatDate(video.finishDate)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleEdit(video)} size="small"><EditIcon fontSize="small" /></IconButton>
                    <IconButton onClick={() => handleDelete(video._id)} size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                    <IconButton
                      onClick={() => toggleExpandVideo(video)}
                      size="small"
                      color= 'primary' 
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Stack>
              )}

              {expandedVideo === video._id  && (
                <Box mt={2}>
                  <Divider sx={{ mb: 2, display: { xs: 'block', md: 'none' } }} />
                  <Box sx={{
                    position: 'relative',
                    pt: '56.25%',
                    bgcolor: '#000',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}>
                    <Box
                      component="video"
                      controls
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <source
                        src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`}
                        type="video/mp4"
                      />
                      הדפדפן שלך לא תומך בווידאו.
                    </Box>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
      ))}
      {/* <Dialog
  open={expiredDialog}
  onClose={() => setExpiredDialog(false)}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle>גישה חסומה</DialogTitle>
  <DialogContent>
    <Typography variant="body1">
      לא ניתן לצפות בסרטון כיוון שתוקף הצפייה פג.
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setExpiredDialog(false)} color="primary" variant="contained">
      הבנתי
    </Button>
  </DialogActions>
</Dialog> */}
    </Grid>
    
  );
};

export default VideoList;
