

// // // // // import { useGetAllMaterialsByNameCourseQuery } from "../../redux/slice/api/materialsApi";
// // // // // import { Video } from "../../interface/VideoMaterial";

// // // // // interface Props {
// // // // //   courseName: string;
// // // // // }

// // // // // const VideoList = ({ courseName }: Props) => {
// // // // //   const { data, isError, isLoading } = useGetAllMaterialsByNameCourseQuery(courseName);
  
// // // // //   // 🔹 וידוא שהנתונים לא undefined
// // // // //   const videos: Video[] = data?.videos || [];

// // // // //   if (isLoading) return <p>Loading...</p>;
// // // // //   if (isError) return <p>Error loading videos.</p>;
// // // // //   if (videos.length === 0) return <p>No videos available</p>;

// // // // //   return (
// // // // //     <div className="video-list">
// // // // //       {videos.map((video) => {
// // // // //         // 🔹 יצירת תאריך נוכחי להשוואה
// // // // //         const currentDate = new Date();
// // // // //         const finishDate = new Date(video.finishDate);
// // // // //         // 🔹 אם התאריך הנוכחי עבר את finishDate, לא ניתן להציג את הסרטון
// // // // //         const isVideoExpired = currentDate > finishDate;
// // // // //         return (
// // // // //           <div key={video._id} className="video-item">
// // // // //             <h3>{video.videoName}</h3>
// // // // //             <div style={{ position: "relative", display: "inline-block" }}>
// // // // //               <video
// // // // //                 width="600"
// // // // //                 controls={!isVideoExpired}
// // // // //                 style={{ pointerEvents: isVideoExpired ? "none" : "auto" }}
// // // // //               >
// // // // //                 <source src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`} type="video/mp4" />
// // // // //                 הדפדפן שלך לא תומך בווידאו.
// // // // //               </video>

// // // // //               {isVideoExpired && (
// // // // //                 <div
// // // // //                   style={{
// // // // //                     position: "absolute",
// // // // //                     top: 0,
// // // // //                     left: 0,
// // // // //                     width: "100%",
// // // // //                     height: "100%",
// // // // //                     display: "flex",
// // // // //                     alignItems: "center",
// // // // //                     justifyContent: "center",
// // // // //                     backgroundColor: "rgba(0, 0, 0, 0.5)",
// // // // //                     color: "#fff",
// // // // //                     fontSize: "20px",
// // // // //                     fontWeight: "bold",
// // // // //                     textAlign: "center",
// // // // //                     pointerEvents: "none",
// // // // //                   }}
// // // // //                 >
// // // // //                   הצפייה אינה זמינה — תאריך פג
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>

// // // // //             <p>סיום צפייה: {finishDate.toLocaleDateString()}</p>
// // // // //           </div>
// // // // //         );
// // // // //       })}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default VideoList;



// // // // // import React, { useState } from 'react';
// // // // // import {
// // // // //   Stack,
// // // // //   IconButton,
// // // // //   TextField,
// // // // //   Box,
// // // // //   Typography,
// // // // //   Card,
// // // // //   CardContent,
// // // // //   CardActions,
// // // // //   Divider,
// // // // //   Grid,
// // // // //   CircularProgress,
// // // // //   Alert,
// // // // //   Chip
// // // // // } from '@mui/material';
// // // // // import DeleteIcon from '@mui/icons-material/Delete';
// // // // // import EditIcon from '@mui/icons-material/Edit';
// // // // // import CheckIcon from '@mui/icons-material/Check';
// // // // // import CloseIcon from '@mui/icons-material/Close';
// // // // // import VisibilityIcon from '@mui/icons-material/Visibility';
// // // // // import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// // // // // import { useDispatch } from 'react-redux';
// // // // // import {
// // // // //   useDeleteMaterialMutation,
// // // // //   useGetAllMaterialsByNameCourseQuery,
// // // // //   useUpDateMaterialMutation,
// // // // // } from '../../redux/slice/api/materialsApi';
// // // // // import { deleteVideo } from '../../redux/slice/videoSlice';
// // // // // import { Video } from '../../interface/VideoMaterial';

// // // // // interface Props {
// // // // //   courseName: string;
// // // // // }

// // // // // const VideoList: React.FC<Props> = ({ courseName }) => {
// // // // //   const { data, isError, isLoading, refetch } = useGetAllMaterialsByNameCourseQuery(courseName);
  
// // // // //   const [deleteMaterial] = useDeleteMaterialMutation();
// // // // //   const [upDateMaterial] = useUpDateMaterialMutation();
// // // // //   const dispatch = useDispatch();
// // // // //   const videos = data?.videos || [];

// // // // //   const [editingId, setEditingId] = useState<string | null>(null);
// // // // //   const [editedName, setEditedName] = useState('');
// // // // //   const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

// // // // //   const handleDelete = async (videoId: string) => {
// // // // //     if (!window.confirm('האם אתה בטוח שברצונך למחוק את הסרטון?')) {
// // // // //       return;
// // // // //     }
    
// // // // //     try {
// // // // //       await deleteMaterial(videoId).unwrap();
// // // // //       dispatch(deleteVideo(videoId));
// // // // //       refetch();
// // // // //     } catch (error) {
// // // // //       console.error('Error deleting video:', error);
// // // // //     }
// // // // //   };

// // // // //   const handleEdit = (video: Video) => {
// // // // //     setEditingId(video._id);
// // // // //     setEditedName(video.videoName);
// // // // //   };

// // // // //   const handleSave = async (video: Video) => {
// // // // //     const formData = new FormData();
// // // // //     formData.append('videoName', editedName);
// // // // //     formData.append('nameCours', courseName);
// // // // //     formData.append('_id', video._id);

// // // // //     try {
// // // // //       await upDateMaterial(formData).unwrap();
// // // // //       setEditingId(null);
// // // // //       refetch();
// // // // //     } catch (error) {
// // // // //       console.error('Error updating video name:', error);
// // // // //     }
// // // // //   };

// // // // //   const handleCancel = () => {
// // // // //     setEditingId(null);
// // // // //     setEditedName('');
// // // // //   };

// // // // //   const toggleExpandVideo = (videoId: string) => {
// // // // //     if (expandedVideo === videoId) {
// // // // //       setExpandedVideo(null);
// // // // //     } else {
// // // // //       setExpandedVideo(videoId);
// // // // //     }
// // // // //   };

// // // // //   const formatDate = (dateString: string | Date) => {
// // // // //     const date = new Date(dateString);
// // // // //     return date.toLocaleDateString('he-IL', {
// // // // //       year: 'numeric',
// // // // //       month: 'long',
// // // // //       day: 'numeric',
// // // // //       hour: '2-digit',
// // // // //       minute: '2-digit'
// // // // //     });
// // // // //   };

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
// // // // //         <CircularProgress />
// // // // //       </Box>
// // // // //     );
// // // // //   }

// // // // //   if (isError) {
// // // // //     return (
// // // // //       <Alert severity="error" sx={{ my: 2 }}>
// // // // //         שגיאה בטעינת הסרטונים. אנא נסה שוב מאוחר יותר.
// // // // //       </Alert>
// // // // //     );
// // // // //   }

// // // // //   if (videos.length === 0) {
// // // // //     return (
// // // // //       <Alert severity="info" sx={{ my: 2 }}>
// // // // //         אין סרטונים זמינים בקורס זה.
// // // // //       </Alert>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <Grid container spacing={3}>
// // // // //       {videos.map((video) => (
// // // // //         <Grid item xs={12} key={video._id}>
// // // // //           <Card 
// // // // //             variant="outlined" 
// // // // //             sx={{ 
// // // // //               borderRadius: 2,
// // // // //               transition: 'all 0.3s ease',
// // // // //               '&:hover': {
// // // // //                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
// // // // //               }
// // // // //             }}
// // // // //           >
// // // // //             <CardContent>
// // // // //               {editingId === video._id ? (
// // // // //                 <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
// // // // //                   <TextField
// // // // //                     value={editedName}
// // // // //                     onChange={(e) => setEditedName(e.target.value)}
// // // // //                     variant="outlined"
// // // // //                     size="small"
// // // // //                     fullWidth
// // // // //                     autoFocus
// // // // //                   />
// // // // //                   <IconButton onClick={() => handleSave(video)} color="primary" aria-label="save">
// // // // //                     <CheckIcon />
// // // // //                   </IconButton>
// // // // //                   <IconButton onClick={handleCancel} color="error" aria-label="cancel">
// // // // //                     <CloseIcon />
// // // // //                   </IconButton>
// // // // //                 </Stack>
// // // // //               ) : (
// // // // //                 <Stack 
// // // // //                   direction="row" 
// // // // //                   spacing={1} 
// // // // //                   sx={{ 
// // // // //                     alignItems: 'center', 
// // // // //                     justifyContent: 'space-between',
// // // // //                     mb: 2
// // // // //                   }}
// // // // //                 >
// // // // //                   <Box>
// // // // //                     <Typography variant="h6" component="h3">
// // // // //                       {video.videoName}
// // // // //                     </Typography>
// // // // //                     <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
// // // // //                       <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
// // // // //                       <Typography variant="caption" color="text.secondary">
// // // // //                         זמין עד: {formatDate(video.finishDate)}
// // // // //                       </Typography>
// // // // //                     </Box>
// // // // //                   </Box>
// // // // //                   <Box>
// // // // //                     <IconButton onClick={() => handleEdit(video)} aria-label="edit" size="small">
// // // // //                       <EditIcon fontSize="small" />
// // // // //                     </IconButton>
// // // // //                     <IconButton onClick={() => handleDelete(video._id)} aria-label="delete" size="small" color="error">
// // // // //                       <DeleteIcon fontSize="small" />
// // // // //                     </IconButton>
// // // // //                     <IconButton onClick={() => toggleExpandVideo(video._id)} aria-label="view" size="small" color="primary">
// // // // //                       <VisibilityIcon fontSize="small" />
// // // // //                     </IconButton>
// // // // //                   </Box>
// // // // //                 </Stack>
// // // // //               )}

// // // // //               {expandedVideo === video._id && (
// // // // //                 <Box sx={{ mt: 2 }}>
// // // // //                   <Divider sx={{ mb: 2 }} />
// // // // //                   <Box 
// // // // //                     sx={{ 
// // // // //                       position: 'relative',
// // // // //                       paddingTop: '56.25%', // 16:9 aspect ratio
// // // // //                       backgroundColor: '#000',
// // // // //                       borderRadius: 1,
// // // // //                       overflow: 'hidden'
// // // // //                     }}
// // // // //                   >
// // // // //                     <Box 
// // // // //                       component="video"
// // // // //                       sx={{
// // // // //                         position: 'absolute',
// // // // //                         top: 0,
// // // // //                         left: 0,
// // // // //                         width: '100%',
// // // // //                         height: '100%'
// // // // //                       }}
// // // // //                       controls
// // // // //                     >
// // // // //                       <source
// // // // //                         src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`}
// // // // //                         type="video/mp4"
// // // // //                       />
// // // // //                       הדפדפן שלך לא תומך בווידאו.
// // // // //                     </Box>
// // // // //                   </Box>
// // // // //                 </Box>
// // // // //               )}
// // // // //             </CardContent>
// // // // //             {expandedVideo !== video._id && (
// // // // //               <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
// // // // //                 <Chip 
// // // // //                   label="לחץ לצפייה" 
// // // // //                   color="primary" 
// // // // //                   variant="outlined" 
// // // // //                   size="small" 
// // // // //                   icon={<VisibilityIcon />} 
// // // // //                   onClick={() => toggleExpandVideo(video._id)}
// // // // //                 />
// // // // //               </CardActions>
// // // // //             )}
// // // // //           </Card>
// // // // //         </Grid>
// // // // //       ))}
// // // // //     </Grid>
// // // // //   );
// // // // // };

// // // // // export default VideoList;















// // // // // import React, { useState } from 'react';
// // // // // import {
// // // // //   Box,
// // // // //   Grid,
// // // // //   Card,
// // // // //   CardContent,
// // // // //   CardActions,
// // // // //   Typography,
// // // // //   Chip,
// // // // //   CircularProgress,
// // // // //   Alert,
// // // // //   Divider,
// // // // //   IconButton,
// // // // // } from '@mui/material';
// // // // // import VisibilityIcon from '@mui/icons-material/Visibility';
// // // // // import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// // // // // import { useGetAllMaterialsByNameCourseQuery } from '../../redux/slice/api/materialsApi';
// // // // // import { Video } from '../../interface/VideoMaterial';

// // // // // interface Props {
// // // // //   courseName: string;
// // // // // }

// // // // // const VideoList: React.FC<Props> = ({ courseName }) => {
// // // // //   const { data, isError, isLoading } = useGetAllMaterialsByNameCourseQuery(courseName);
// // // // //   const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
// // // // //   const isVideoValid = (date: string | Date) => new Date(date) > new Date();
// // // // //   const videos: Video[] = data?.videos || [];
// // // // //   const [expiredDialog, setExpiredDialog] = useState(false);

// // // // //    const toggleExpandVideo = (video: Video) => {
// // // // //   if (!isVideoValid(video.finishDate)) {
// // // // //     setExpiredDialog(true);
// // // // //     return;
// // // // //   }
// // // // //   setExpandedVideo(prev => (prev === video._id ? null : video._id));
// // // // // };

// // // // //   const formatDate = (dateString: string | Date) => {
// // // // //     const date = new Date(dateString);
// // // // //     return date.toLocaleDateString('he-IL', {
// // // // //       year: 'numeric',
// // // // //       month: 'long',
// // // // //       day: 'numeric',
// // // // //       hour: '2-digit',
// // // // //       minute: '2-digit',
// // // // //     });
// // // // //   };

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
// // // // //         <CircularProgress />
// // // // //       </Box>
// // // // //     );
// // // // //   }

// // // // //   if (isError) {
// // // // //     return (
// // // // //       <Alert severity="error" sx={{ my: 2 }}>
// // // // //         שגיאה בטעינת הסרטונים. נסה שוב מאוחר יותר.
// // // // //       </Alert>
// // // // //     );
// // // // //   }

// // // // //   if (videos.length === 0) {
// // // // //     return (
// // // // //       <Alert severity="info" sx={{ my: 2 }}>
// // // // //         אין סרטונים זמינים בקורס זה.
// // // // //       </Alert>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <Grid container spacing={3}>
// // // // //       {videos.map((video) => {
// // // // //         const finishDate = new Date(video.finishDate);
// // // // //         const currentDate = new Date();
// // // // //         const isExpired = currentDate > finishDate;

// // // // //         return (
// // // // //           <Grid item xs={12} md={6} key={video._id}>
// // // // //             <Card
// // // // //               variant="outlined"
// // // // //               sx={{
// // // // //                 borderRadius: 2,
// // // // //                 transition: 'all 0.3s ease',
// // // // //                 '&:hover': {
// // // // //                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
// // // // //                 },
// // // // //               }}
// // // // //             >
// // // // //               <CardContent>
// // // // //                 <Typography variant="h6">{video.videoName}</Typography>
// // // // //                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
// // // // //                   <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
// // // // //                   <Typography variant="caption" color="text.secondary">
// // // // //                     זמין עד: {formatDate(finishDate)}
// // // // //                   </Typography>
// // // // //                 </Box>
// // // // //               </CardContent>

// // // // //               {expandedVideo === video._id && (
// // // // //                 <>
// // // // //                   <Divider />
// // // // //                   <Box
// // // // //                     sx={{
// // // // //                       position: 'relative',
// // // // //                       paddingTop: '56.25%',
// // // // //                       backgroundColor: '#000',
// // // // //                       borderRadius: 1,
// // // // //                       overflow: 'hidden',
// // // // //                       mx: 2,
// // // // //                       mb: 2,
// // // // //                     }}
// // // // //                   >
// // // // //                     <Box
// // // // //                       component="video"
// // // // //                       sx={{
// // // // //                         position: 'absolute',
// // // // //                         top: 0,
// // // // //                         left: 0,
// // // // //                         width: '100%',
// // // // //                         height: '100%',
// // // // //                         objectFit: 'cover',
// // // // //                       }}
// // // // //                       controls={!isExpired}
// // // // //                       style={{ pointerEvents: isExpired ? 'none' : 'auto' }}
// // // // //                     >
// // // // //                       <source
// // // // //                         src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`}
// // // // //                         type="video/mp4"
// // // // //                       />
// // // // //                       הדפדפן שלך לא תומך בווידאו.
// // // // //                     </Box>

// // // // //                     {isExpired && (
// // // // //                       <Box
// // // // //                         sx={{
// // // // //                           position: 'absolute',
// // // // //                           top: 0,
// // // // //                           left: 0,
// // // // //                           width: '100%',
// // // // //                           height: '100%',
// // // // //                           bgcolor: 'rgba(0,0,0,0.5)',
// // // // //                           display: 'flex',
// // // // //                           alignItems: 'center',
// // // // //                           justifyContent: 'center',
// // // // //                           color: '#fff',
// // // // //                           fontSize: 18,
// // // // //                           fontWeight: 'bold',
// // // // //                           textAlign: 'center',
// // // // //                           pointerEvents: 'none',
// // // // //                         }}
// // // // //                       >
// // // // //                         הצפייה אינה זמינה — תאריך פג
// // // // //                       </Box>
// // // // //                     )}
// // // // //                   </Box>
// // // // //                 </>
// // // // //               )}

// // // // //               <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
// // // // //                 <Chip
// // // // //                   label={expandedVideo === video._id ? 'סגור צפייה' : 'לחץ לצפייה'}
// // // // //                   icon={<VisibilityIcon />}
// // // // //                   onClick={() => toggleExpandVideo(video)}
// // // // //                   color="primary"
// // // // //                   variant="outlined"
// // // // //                   size="small"
// // // // //                 />
// // // // //               </CardActions>
// // // // //             </Card>
// // // // //           </Grid>
// // // // //         );
// // // // //       })}
// // // // //     </Grid>
// // // // //   );
// // // // // };

// // // // // export default VideoList;
















// // // import React, { useState } from 'react';
// // // import {
// // //   Box,
// // //   Grid,
// // //   Card,
// // //   CardContent,
// // //   CardActions,
// // //   Typography,
// // //   Chip,
// // //   CircularProgress,
// // //   Alert,
// // //   Divider,
// // //   Snackbar,
// // // } from '@mui/material';
// // // import VisibilityIcon from '@mui/icons-material/Visibility';
// // // import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// // // import { useGetAllMaterialsByNameCourseQuery } from '../../redux/slice/api/materialsApi';
// // // import { Video } from '../../interface/VideoMaterial';

// // // interface Props {
// // //   courseName: string;
// // // }

// // // const VideoList: React.FC<Props> = ({ courseName }) => {
// // //   const { data, isError, isLoading } = useGetAllMaterialsByNameCourseQuery(courseName);
// // //   const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
// // //   const [showSnackbar, setShowSnackbar] = useState(false);

// // //   const isVideoValid = (date: string | Date) => new Date(date) > new Date();
// // //   const videos: Video[] = data?.videos || [];

// // //   const toggleExpandVideo = (video: Video) => {
// // //     if (!isVideoValid(video.finishDate)) {
// // //       setShowSnackbar(true);
// // //       return;
// // //     }
// // //     setExpandedVideo(prev => (prev === video._id ? null : video._id));
// // //   };

// // //   const formatDate = (dateString: string | Date) => {
// // //     const date = new Date(dateString);
// // //     return date.toLocaleDateString('he-IL', {
// // //       year: 'numeric',
// // //       month: 'long',
// // //       day: 'numeric',
// // //       hour: '2-digit',
// // //       minute: '2-digit',
// // //     });
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
// // //         <CircularProgress />
// // //       </Box>
// // //     );
// // //   }

// // //   if (isError) {
// // //     return (
// // //       <Alert severity="error" sx={{ my: 2 }}>
// // //         שגיאה בטעינת הסרטונים. נסה שוב מאוחר יותר.
// // //       </Alert>
// // //     );
// // //   }

// // //   if (videos.length === 0) {
// // //     return (
// // //       <Alert severity="info" sx={{ my: 2 }}>
// // //         אין סרטונים זמינים בקורס זה.
// // //       </Alert>
// // //     );
// // //   }

// // //   return (
// // //     <>
// // //       <Grid container spacing={3}>
// // //         {videos.map((video) => {
// // //           const finishDate = new Date(video.finishDate);
// // //           const isExpired = new Date() > finishDate;

// // //           return (
// // //             <Grid item xs={12} md={6} key={video._id}>
// // //               <Card
// // //                 variant="outlined"
// // //                 sx={{
// // //                   borderRadius: 2,
// // //                   transition: 'all 0.3s ease',
// // //                   '&:hover': {
// // //                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
// // //                   },
// // //                 }}
// // //               >
// // //                 <CardContent>
// // //                   <Typography variant="h6">{video.videoName}</Typography>
// // //                   <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
// // //                     <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
// // //                     <Typography variant="caption" color="text.secondary">
// // //                       זמין עד: {formatDate(finishDate)}
// // //                     </Typography>
// // //                   </Box>
// // //                 </CardContent>

// // //                 {expandedVideo === video._id && (
// // //                   <>
// // //                     <Divider />
// // //                     <Box
// // //                       sx={{
// // //                         position: 'relative',
// // //                         paddingTop: '56.25%',
// // //                         backgroundColor: '#000',
// // //                         borderRadius: 1,
// // //                         overflow: 'hidden',
// // //                         mx: 2,
// // //                         mb: 2,
// // //                       }}
// // //                     >
// // //                       <Box
// // //                         component="video"
// // //                         sx={{
// // //                           position: 'absolute',
// // //                           top: 0,
// // //                           left: 0,
// // //                           width: '100%',
// // //                           height: '100%',
// // //                           objectFit: 'cover',
// // //                         }}
// // //                         controls={!isExpired}
// // //                         style={{ pointerEvents: isExpired ? 'none' : 'auto' }}
// // //                       >
// // //                         <source
// // //                           src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`}
// // //                           type="video/mp4"
// // //                         />
// // //                         הדפדפן שלך לא תומך בווידאו.
// // //                       </Box>

// // //                       {isExpired && (
// // //                         <Box
// // //                           sx={{
// // //                             position: 'absolute',
// // //                             top: 0,
// // //                             left: 0,
// // //                             width: '100%',
// // //                             height: '100%',
// // //                             bgcolor: 'rgba(0,0,0,0.5)',
// // //                             display: 'flex',
// // //                             alignItems: 'center',
// // //                             justifyContent: 'center',
// // //                             color: '#fff',
// // //                             fontSize: 18,
// // //                             fontWeight: 'bold',
// // //                             textAlign: 'center',
// // //                             pointerEvents: 'none',
// // //                           }}
// // //                         >
// // //                           הצפייה אינה זמינה — תאריך פג
// // //                         </Box>
// // //                       )}
// // //                     </Box>
// // //                   </>
// // //                 )}

// // //                 <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
// // //                   <Chip
// // //                     label={expandedVideo === video._id ? 'סגור צפייה' : 'לחץ לצפייה'}
// // //                     icon={
// // //                       <VisibilityIcon sx={{ color: isExpired ? '#9e9e9e' : 'inherit' }} />
// // //                     }
// // //                     onClick={() => toggleExpandVideo(video)}
// // //                     color={isExpired ? 'default' : 'primary'}
// // //                     variant="outlined"
// // //                     size="small"
// // //                     sx={{
// // //                       pointerEvents: 'auto',
// // //                       cursor: isExpired ? 'not-allowed' : 'pointer',
// // //                     }}
// // //                   />
// // //                 </CardActions>
// // //               </Card>
// // //             </Grid>
// // //           );
// // //         })}
// // //       </Grid>

// // //       <Snackbar
// // //         open={showSnackbar}
// // //         autoHideDuration={3000}
// // //         onClose={() => setShowSnackbar(false)}
// // //         message="לא ניתן לצפות — הסרטון כבר לא זמין"
// // //         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
// // //       />
// // //     </>
// // //   );
// // // };

// // // export default VideoList;



// // import React, { useState } from 'react';
// // import {
// //   Container,
// //   Typography,
// //   Grid,
// //   Card,
// //   CardContent,
// //   CardActions,
// //   Button,
// //   Box,
// //   CircularProgress,
// //   Alert,
// //   Divider,
// //   Chip,
// //   Snackbar,
// //   useTheme,
// // } from '@mui/material';
// // import {
// //   VideoLibrary as VideoIcon,
// //   CalendarToday as CalendarTodayIcon,
// //   Visibility as VisibilityIcon,
// // } from '@mui/icons-material';
// // import { useGetAllMaterialsByNameCourseQuery } from '../../redux/slice/api/materialsApi';
// // import { Video } from '../../interface/VideoMaterial';

// // interface Props {
// //   courseName: string;
// // }

// // const VideoList: React.FC<Props> = ({ courseName }) => {
// //   const theme = useTheme();
// //   const { data, isError, isLoading } = useGetAllMaterialsByNameCourseQuery(courseName);
// //   const [activePanel, setActivePanel] = useState<'videos' | null>(null);
// //   const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
// //   const [showSnackbar, setShowSnackbar] = useState(false);

// //   const isVideoValid = (date: string | Date) => new Date(date) > new Date();
// //   const videos: Video[] = data?.videos || [];

// //   const toggleExpandVideo = (video: Video) => {
// //     if (!isVideoValid(video.finishDate)) {
// //       setShowSnackbar(true);
// //       return;
// //     }
// //     setExpandedVideo(prev => (prev === video._id ? null : video._id));
// //   };

// //   const formatDate = (dateString: string | Date) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('he-IL', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit',
// //     });
// //   };

// //   if (isLoading) {
// //     return (
// //       <Container maxWidth="lg" sx={{ py: 4 }}>
// //         <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
// //           <CircularProgress />
// //         </Box>
// //       </Container>
// //     );
// //   }

// //   if (isError) {
// //     return (
// //       <Container maxWidth="lg" sx={{ py: 4 }}>
// //         <Alert severity="error" sx={{ my: 2 }}>
// //           שגיאה בטעינת הסרטונים. נסה שוב מאוחר יותר.
// //         </Alert>
// //       </Container>
// //     );
// //   }

// //   if (videos.length === 0) {
// //     return (
// //       <Container maxWidth="lg" sx={{ py: 4 }}>
// //         <Alert severity="info" sx={{ my: 2 }}>
// //           אין סרטונים זמינים בקורס זה.
// //         </Alert>
// //       </Container>
// //     );
// //   }

// //   const renderVideoContent = () => (
// //     <Grid container spacing={3}>
// //       {videos.map((video) => {
// //         const finishDate = new Date(video.finishDate);
// //         const isExpired = new Date() > finishDate;

// //         return (
// //           <Grid item xs={12} key={video._id}>
// //             <Card
// //               variant="outlined"
// //               sx={{
// //                 borderRadius: 2,
// //                 transition: 'all 0.3s ease',
// //                 '&:hover': {
// //                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
// //                 },
// //               }}
// //             >
// //               <CardContent>
// //                 <Typography variant="h6">{video.videoName}</Typography>
// //                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
// //                   <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
// //                   <Typography variant="caption" color="text.secondary">
// //                     זמין עד: {formatDate(finishDate)}
// //                   </Typography>
// //                 </Box>
// //               </CardContent>

// //               {expandedVideo === video._id && (
// //                 <>
// //                   <Divider />
// //                   <Box
// //                     sx={{
// //                       position: 'relative',
// //                       paddingTop: '56.25%',
// //                       backgroundColor: '#000',
// //                       borderRadius: 1,
// //                       overflow: 'hidden',
// //                       mx: 2,
// //                       mb: 2,
// //                     }}
// //                   >
// //                     <Box
// //                       component="video"
// //                       sx={{
// //                         position: 'absolute',
// //                         top: 0,
// //                         left: 0,
// //                         width: '100%',
// //                         height: '100%',
// //                         objectFit: 'cover',
// //                       }}
// //                       controls={!isExpired}
// //                       style={{ pointerEvents: isExpired ? 'none' : 'auto' }}
// //                     >
// //                       <source
// //                         src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`}
// //                         type="video/mp4"
// //                       />
// //                       הדפדפן שלך לא תומך בווידאו.
// //                     </Box>

// //                     {isExpired && (
// //                       <Box
// //                         sx={{
// //                           position: 'absolute',
// //                           top: 0,
// //                           left: 0,
// //                           width: '100%',
// //                           height: '100%',
// //                           bgcolor: 'rgba(0,0,0,0.5)',
// //                           display: 'flex',
// //                           alignItems: 'center',
// //                           justifyContent: 'center',
// //                           color: '#fff',
// //                           fontSize: 18,
// //                           fontWeight: 'bold',
// //                           textAlign: 'center',
// //                           pointerEvents: 'none',
// //                         }}
// //                       >
// //                         הצפייה אינה זמינה — תאריך פג
// //                       </Box>
// //                     )}
// //                   </Box>
// //                 </>
// //               )}

// //               <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
// //                 <Chip
// //                   // label={expandedVideo === video._id ? 'סגור צפייה' : 'לחץ לצפייה'}
// //                   icon={
// //                     <VisibilityIcon sx={{ color: isExpired ? '#9e9e9e' : 'inherit'  }} />                   
// //                   }
// //                   onClick={() => toggleExpandVideo(video)}
// //                   color={isExpired ? 'default' : 'primary'}
// //                   variant="outlined"
// //                   size="small"
// //                   sx={{
// //                     pointerEvents: 'auto',
// //                     cursor: isExpired ? 'not-allowed' : 'pointer',
// //                   }}
// //                 />
// //               </CardActions>
// //             </Card>
// //           </Grid>
// //         );
// //       })}
// //     </Grid>
// //   );

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 4 }}>
// //       <Grid container spacing={3}>
// //         <Grid item xs={12} sm={6} md={4}>
// //           <Card
// //             sx={{
// //               height: '100%',
// //               display: 'flex',
// //               flexDirection: 'column',
// //               transition: 'transform 0.2s',
// //               '&:hover': { transform: 'translateY(-5px)' },
// //               border: activePanel === 'videos' ? `2px solid ${theme.palette.primary.main}` : 'none',
// //             }}
// //           >
// //             <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
// //               <VideoIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
// //               <Typography variant="h6">סרטוני לימוד</Typography>
// //               <Typography variant="body2" color="text.secondary">
// //                 צפייה בסרטוני הקורס
// //               </Typography>
// //             </CardContent>
// //             <CardActions>
// //               <Button
// //                 fullWidth
// //                 variant={activePanel === 'videos' ? 'contained' : 'outlined'}
// //                 onClick={() => setActivePanel(activePanel === 'videos' ? null : 'videos')}
// //               >
// //                 {activePanel === 'videos' ? 'הסתר' : 'הצג סרטונים'}
// //               </Button>
// //             </CardActions>
// //           </Card>
// //         </Grid>
// //       </Grid>

// //       <Box sx={{ mt: 4 }}>
// //         {activePanel === 'videos' && renderVideoContent()}
// //       </Box>

// //       <Snackbar
// //         open={showSnackbar}
// //         autoHideDuration={3000}
// //         onClose={() => setShowSnackbar(false)}
// //         message="לא ניתן לצפות — הסרטון כבר לא זמין"
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
// //       />
// //     </Container>
// //   );
// // };

// // export default VideoList;

// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Box,
//   CircularProgress,
//   Alert,
//   Divider,
//   Chip,
//   Snackbar,
//   useTheme,
// } from '@mui/material';
// import {
//   VideoLibrary as VideoIcon,
//   CalendarToday as CalendarTodayIcon,
//   Visibility as VisibilityIcon,
// } from '@mui/icons-material';
// import { useGetAllMaterialsByNameCourseQuery } from '../../redux/slice/api/materialsApi';
// import { Video } from '../../interface/VideoMaterial';

// interface Props {
//   courseName: string;
// }

// const VideoList: React.FC<Props> = ({ courseName }) => {
//   const theme = useTheme();
//   const { data, isError, isLoading } = useGetAllMaterialsByNameCourseQuery(courseName);
//   const [activePanel, setActivePanel] = useState<'videos' | null>(null);
//   const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
//   const [showSnackbar, setShowSnackbar] = useState(false);

//   const isVideoValid = (date: string | Date) => new Date(date) > new Date();
//   const videos: Video[] = data?.videos || [];

//   const toggleExpandVideo = (video: Video) => {
//     if (!isVideoValid(video.finishDate)) {
//       setShowSnackbar(true);
//       return;
//     }
//     setExpandedVideo(prev => (prev === video._id ? null : video._id));
//   };

//   const formatDate = (dateString: string | Date) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('he-IL', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   if (isLoading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//           <CircularProgress />
//         </Box>
//       </Container>
//     );
//   }

//   if (isError) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Alert severity="error" sx={{ my: 2 }}>
//           שגיאה בטעינת הסרטונים. נסה שוב מאוחר יותר.
//         </Alert>
//       </Container>
//     );
//   }

//   if (videos.length === 0) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Alert severity="info" sx={{ my: 2 }}>
//           אין סרטונים זמינים בקורס זה.
//         </Alert>
//       </Container>
//     );
//   }

//   const renderVideoContent = () => (
//     <Grid container spacing={3}>
//       {videos.map((video) => {
//         const finishDate = new Date(video.finishDate);
//         const isExpired = new Date() > finishDate;

//         return (
//           <Grid item xs={12} key={video._id}>
//             <Card
//               variant="outlined"
//               sx={{
//                 borderRadius: 2,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                 },
//               }}
//             >
//               <CardContent>
//                 <Typography variant="h6">{video.videoName}</Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                   <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
//                   <Typography variant="caption" color="text.secondary">
//                     זמין עד: {formatDate(finishDate)}
//                   </Typography>
//                 </Box>
//               </CardContent>

//               {expandedVideo === video._id && (
//                 <>
//                   <Divider />
//                   <Box
//                     sx={{
//                       position: 'relative',
//                       paddingTop: '56.25%',
//                       backgroundColor: '#000',
//                       borderRadius: 1,
//                       overflow: 'hidden',
//                       mx: 2,
//                       mb: 2,
//                     }}
//                   >
//                     <Box
//                       component="video"
//                       sx={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                         objectFit: 'cover',
//                       }}
//                       controls={!isExpired}
//                       style={{ pointerEvents: isExpired ? 'none' : 'auto' }}
//                     >
//                       <source
//                         src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`}
//                         type="video/mp4"
//                       />
//                       הדפדפן שלך לא תומך בווידאו.
//                     </Box>

//                     {isExpired && (
//                       <Box
//                         sx={{
//                           position: 'absolute',
//                           top: 0,
//                           left: 0,
//                           width: '100%',
//                           height: '100%',
//                           bgcolor: 'rgba(0,0,0,0.5)',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           color: '#fff',
//                           fontSize: 18,
//                           fontWeight: 'bold',
//                           textAlign: 'center',
//                           pointerEvents: 'none',
//                         }}
//                       >
//                         הצפייה אינה זמינה — תאריך פג
//                       </Box>
//                     )}
//                   </Box>
//                 </>
//               )}

//               <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
//                 <Box
//                   onClick={() => toggleExpandVideo(video)}
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     cursor: isExpired ? 'not-allowed' : 'pointer',
//                     p: 1,
//                     borderRadius: 1,
//                     '&:hover': {
//                       backgroundColor: isExpired ? 'transparent' : 'action.hover',
//                     },
//                   }}
//                 >
//                   <VisibilityIcon 
//                     sx={{ 
//                       color: isExpired ? '#9e9e9e' : 'primary.main',
//                       fontSize: 24 
//                     }} 
//                   />
//                 </Box>
//               </CardActions>
//             </Card>
//           </Grid>
//         );
//       })}
//     </Grid>
//   );

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card
//             sx={{
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               transition: 'transform 0.2s',
//               '&:hover': { transform: 'translateY(-5px)' },
//               border: activePanel === 'videos' ? `2px solid ${theme.palette.primary.main}` : 'none',
//             }}
//           >
//             <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
//               <VideoIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
//               <Typography variant="h6">סרטוני לימוד</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 צפייה בסרטוני הקורס
//               </Typography>
//             </CardContent>
//             <CardActions>
//               <Button
//                 fullWidth
//                 variant={activePanel === 'videos' ? 'contained' : 'outlined'}
//                 onClick={() => setActivePanel(activePanel === 'videos' ? null : 'videos')}
//               >
//                 {activePanel === 'videos' ? 'הסתר' : 'הצג סרטונים'}
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>
//       </Grid>

//       <Box sx={{ mt: 4 }}>
//         {activePanel === 'videos' && renderVideoContent()}
//       </Box>

//       <Snackbar
//         open={showSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setShowSnackbar(false)}
//         message="לא ניתן לצפות — הסרטון כבר לא זמין"
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       />
//     </Container>
//   );
// };

// export default VideoList;



// import React, { useState } from 'react';
// import {Container,Typography,Grid, Card, CardContent, CardActions,Box, CircularProgress, Alert,
//  Divider, Snackbar, useTheme,} from '@mui/material';
// import { CalendarToday as CalendarTodayIcon, Visibility as VisibilityIcon,} from '@mui/icons-material';
// import { useGetAllMaterialsByNameCourseQuery } from '../../redux/slice/api/materialsApi';
// import { Video } from '../../interface/VideoMaterial';

// interface Props {
//   courseName: string;
// }

// const VideoList: React.FC<Props> = ({ courseName }) => {
//   const theme = useTheme();
//   const { data, isError, isLoading } = useGetAllMaterialsByNameCourseQuery(courseName);
//   const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
//   const [showSnackbar, setShowSnackbar] = useState(false);

//   const isVideoValid = (date: string | Date) => new Date(date) > new Date();
//   const videos: Video[] = data?.videos || [];

//   const toggleExpandVideo = (video: Video) => {
//     if (!isVideoValid(video.finishDate)) {
//       setShowSnackbar(true);
//       return;
//     }
//     setExpandedVideo(prev => (prev === video._id ? null : video._id));
//   };

//   const formatDate = (dateString: string | Date) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('he-IL', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   if (isLoading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//           <CircularProgress />
//         </Box>
//       </Container>
//     );
//   }

//   if (isError) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Alert severity="error" sx={{ my: 2 }}>
//           שגיאה בטעינת הסרטונים. נסה שוב מאוחר יותר.
//         </Alert>
//       </Container>
//     );
//   }

//   if (videos.length === 0) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Alert severity="info" sx={{ my: 2 }}>
//           אין סרטונים זמינים בקורס זה.
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Grid container spacing={3}>
//         {videos.map((video) => {
//           const finishDate = new Date(video.finishDate);
//           const isExpired = new Date() > finishDate;

//           return (
//             <Grid item xs={12} key={video._id}>
//               <Card
//                 variant="outlined"
//                 sx={{
//                   borderRadius: 2,
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                   },
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6">{video.videoName}</Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                     <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
//                     <Typography variant="caption" color="text.secondary">
//                       זמין עד: {formatDate(finishDate)}
//                     </Typography>
//                   </Box>
//                 </CardContent>

//                 {expandedVideo === video._id && (
//                   <>
//                     <Divider />
//                     <Box
//                       sx={{
//                         position: 'relative',
//                         paddingTop: '56.25%',
//                         backgroundColor: '#000',
//                         borderRadius: 1,
//                         overflow: 'hidden',
//                         mx: 2,
//                         mb: 2,
//                       }}
//                     >
//                       <Box
//                         component="video"
//                         sx={{
//                           position: 'absolute',
//                           top: 0,
//                           left: 0,
//                           width: '100%',
//                           height: '100%',
//                           objectFit: 'cover',
//                         }}
//                         controls={!isExpired}
//                         style={{ pointerEvents: isExpired ? 'none' : 'auto' }}
//                       >
//                         <source
//                           src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`}
//                           type="video/mp4"
//                         />
//                         הדפדפן שלך לא תומך בווידאו.
//                       </Box>

//                       {isExpired && (
//                         <Box
//                           sx={{
//                             position: 'absolute',
//                             top: 0,
//                             left: 0,
//                             width: '100%',
//                             height: '100%',
//                             bgcolor: 'rgba(0,0,0,0.5)',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             color: '#fff',
//                             fontSize: 18,
//                             fontWeight: 'bold',
//                             textAlign: 'center',
//                             pointerEvents: 'none',
//                           }}
//                         >
//                           הצפייה אינה זמינה — תאריך פג
//                         </Box>
//                       )}
//                     </Box>
//                   </>
//                 )}

//                 <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
//                   <Box
//                     onClick={() => toggleExpandVideo(video)}
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       cursor: isExpired ? 'not-allowed' : 'pointer',
//                       p: 1,
//                       borderRadius: 1,
//                       '&:hover': {
//                         backgroundColor: isExpired ? 'transparent' : 'action.hover',
//                       },
//                     }}
//                   >
//                     <VisibilityIcon
//                       sx={{
//                         color: isExpired ? '#9e9e9e' : 'primary.main',
//                         fontSize: 24,
//                       }}
//                     />
//                   </Box>
//                 </CardActions>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       <Snackbar
//         open={showSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setShowSnackbar(false)}
//         message="לא ניתן לצפות — הסרטון כבר לא זמין"
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       />
//     </Container>
//   );
// };

// export default VideoList;




import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  CircularProgress,
  Alert,
  Divider,
  Snackbar,
  useTheme,
} from '@mui/material';
import {
  CalendarToday as CalendarTodayIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useGetAllMaterialsByNameCourseQuery } from '../../redux/slice/api/materialsApi';
import { Video } from '../../interface/VideoMaterial';

interface Props {
  courseName: string;
}

const VideoList: React.FC<Props> = ({ courseName }) => {
  const theme = useTheme();
  const { data, isError, isLoading } = useGetAllMaterialsByNameCourseQuery(courseName);
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Check if video is still valid based on finish date
  const isVideoValid = (date: string | Date) => new Date(date) > new Date();
  const videos: Video[] = data?.videos || [];

  // Toggle video expansion (open/close)
  const toggleExpandVideo = (video: Video) => {
    if (!isVideoValid(video.finishDate)) {
      setShowSnackbar(true);
      return;
    }
    setExpandedVideo(prev => (prev === video._id ? null : video._id));
  };

  // Format date to readable string
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ my: 2 }}>
          Error loading videos. Please try again later.
        </Alert>
      </Container>
    );
  }

  if (videos.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ my: 2 }}>
          No videos available for this course.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {videos.map((video) => {
          const finishDate = new Date(video.finishDate);
          const isExpired = new Date() > finishDate;

          return (
            <Grid item xs={12} key={video._id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6">{video.videoName}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      Available until: {formatDate(finishDate)}
                    </Typography>
                  </Box>
                </CardContent>

                {expandedVideo === video._id && (
                  <>
                    <Divider />
                    <Box
                      sx={{
                        position: 'relative',
                        paddingTop: '56.25%',
                        backgroundColor: '#000',
                        borderRadius: 1,
                        overflow: 'hidden',
                        mx: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        component="video"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        controls={!isExpired}
                        style={{ pointerEvents: isExpired ? 'none' : 'auto' }}
                      >
                        <source
                          src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </Box>

                      {isExpired && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            bgcolor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            pointerEvents: 'none',
                          }}
                        >
                          Viewing not available — expired date
                        </Box>
                      )}
                    </Box>
                  </>
                )}

                <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                  <Box
                    onClick={() => toggleExpandVideo(video)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: isExpired ? 'not-allowed' : 'pointer',
                      p: 1,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: isExpired ? 'transparent' : 'action.hover',
                      },
                    }}
                  >
                    <VisibilityIcon
                      sx={{
                        color: isExpired ? '#9e9e9e' : 'primary.main',
                        fontSize: 24,
                      }}
                    />
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="Cannot view — the video is no longer available"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default VideoList;
