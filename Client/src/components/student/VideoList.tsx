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

const VideoList=({ courseName }:Props) => {
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
