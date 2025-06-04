import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Link,
  Snackbar,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  useGetNewVideosQuery,
  useUpdateLastLoginMutation,
} from '../../redux/slice/api/materialsApi';
import { useGetNewTestsQuery } from '../../redux/slice/api/testApi';
import { markPopupAsShown } from '../../redux/slice/popupslice';

type VideoType = {
  _id: string;
  nameCours: string;
  uploadDate: string;
  videoName: string;
  videoPath: string;
  originalVideoName?: string;
  finishDate: string;
};

const NewContentPopup = () => {
  const dispatch = useDispatch();
  const wasPopupShown = useSelector((state: RootState) => state.popup.wasShown);
  const previousLoginFromRedux = useSelector(
    (state: RootState) => state.userInfo?.previousLogin
  );

  const [open, setOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const lastLogin = previousLoginFromRedux || localStorage.getItem('previousLogin');
 console.log(lastLogin);
 
  const { data: newVideosRaw } = useGetNewVideosQuery(lastLogin ?? '', {
    skip: !lastLogin,
  });
  console.log(newVideosRaw);
  

  const { data: newTests } = useGetNewTestsQuery(lastLogin ?? '', {
    skip: !lastLogin,
  });

  const [updateLastLogin] = useUpdateLastLoginMutation();

 const safeVideos: VideoType[] = (newVideosRaw ?? []).map((video) => ({
  ...video,
  uploadDate: typeof video.uploadDate === 'string'
    ? video.uploadDate
    : new Date(video.uploadDate).toISOString(),
  finishDate: typeof video.finishDate === 'string'
    ? video.finishDate
    : new Date(video.finishDate).toISOString(),
}));

  const safeTests = newTests ?? [];
  const serverUrl = 'http://localhost:8080';

  useEffect(() => {
    if (!wasPopupShown && (safeVideos.length > 0 || safeTests.length > 0)) {
      setOpen(true);
      dispatch(markPopupAsShown());
    }
  }, [safeVideos, safeTests, wasPopupShown, dispatch]);

  const handleClose = async () => {
    try {
      await updateLastLogin().unwrap();
      const now = new Date().toISOString();
      localStorage.setItem('previousLogin', now);
    } catch (error) {
      console.error('Error updating last login date:', error);
    }
    setOpen(false);
  };

  const handleVideoClick = (video: VideoType) => {
    const now = new Date();
    const finish = new Date(video.finishDate);
    if (now > finish) {
      setShowSnackbar(true);
      return;
    }
    setSelectedVideo(video);
    setVideoDialogOpen(true);
  };

  const handleVideoDialogClose = () => {
    setVideoDialogOpen(false);
    setSelectedVideo(null);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>✨ New Content is Waiting for You!</DialogTitle>
        <DialogContent dividers>
          {safeVideos.length > 0 && (
            <>
              <Typography variant="h6">🎥 New Videos:</Typography>
              <List>
                {safeVideos.map((video) => {
                  const isExpired = new Date() > new Date(video.finishDate);
                  return (
                    <ListItem key={video._id} alignItems="flex-start" disablePadding>
                      <ListItemButton onClick={() => handleVideoClick(video)}>
                        <ListItemText
                          primary={
                            <Typography
                              color={isExpired ? 'text.disabled' : 'primary'}
                              sx={{ textDecoration: isExpired ? 'line-through' : 'underline' }}
                            >
                              {video.originalVideoName || video.videoName}
                            </Typography>
                          }
                          secondary={
                            `Course: ${video.nameCours} | Upload Date: ${new Date(
                              video.uploadDate
                            ).toLocaleDateString()}` +
                            (isExpired ? ' | Expired' : '')
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </>
          )}

          {safeTests.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>
                📝 New Tests:
              </Typography>
              <List>
                {safeTests.map((test) => (
                  <ListItem key={test._id}>
                    <ListItemText
                      primary={
                        <Link
                          href={`/HomeStudent/${encodeURIComponent(test.courseName)}`}
                          underline="hover"
                        >
                          {test.title || 'Untitled'}
                        </Link>
                      }
                      secondary={`Course: ${test.courseName}`}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Video Viewer Dialog */}
      <Dialog
        open={videoDialogOpen}
        onClose={handleVideoDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedVideo?.originalVideoName || selectedVideo?.videoName}
        </DialogTitle>
        <DialogContent dividers>
          {selectedVideo && (
            <video
              src={`${serverUrl}/uploads/${encodeURIComponent(
                selectedVideo.nameCours
              )}/${encodeURIComponent(selectedVideo.videoPath)}`}
              controls
              style={{ width: '100%', borderRadius: '8px' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVideoDialogClose} variant="outlined">
            Close Video
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="Unable to watch — video is no longer available"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default NewContentPopup;
