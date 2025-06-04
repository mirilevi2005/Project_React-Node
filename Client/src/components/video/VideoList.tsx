import { useState } from 'react';
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

const VideoList = ({ courseName }: Props) => {
  const { data, isError, isLoading, refetch } = useGetAllMaterialsByNameCourseQuery(courseName);
  const [deleteMaterial] = useDeleteMaterialMutation();
  const [upDateMaterial] = useUpDateMaterialMutation();
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

  const videos = data?.videos || [];

  const formatDate = (dateString: string | Date) =>
    new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
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
    setExpandedVideo(prev => (prev === video._id ? null : video._id));
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
  }

  if (isError) {
    return <Alert severity="error" sx={{ my: 2 }}>Error loading videos. Please try again later.</Alert>;
  }

  if (videos.length === 0) {
    return <Alert severity="info" sx={{ my: 2 }}>No videos available for this course.</Alert>;
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
                        Available until: {formatDate(video.finishDate)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleEdit(video)} size="small"><EditIcon fontSize="small" /></IconButton>
                    <IconButton onClick={() => handleDelete(video._id)} size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                    <IconButton
                      onClick={() => toggleExpandVideo(video)}
                      size="small"
                      color='primary'
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Stack>
              )}

              {expandedVideo === video._id && (
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
                      Your browser does not support the video tag.
                    </Box>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoList;

