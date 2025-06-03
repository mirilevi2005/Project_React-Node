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
};

const NewContentPopup = () => {
  
  const dispatch = useDispatch();
  const wasPopupShown = useSelector(
    (state: RootState) => state.popup.wasShown
  );

  const previousLoginFromRedux =
    useSelector((state: RootState) => state.userInfo?.previousLogin);

  const [open, setOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  const lastLogin =
    previousLoginFromRedux || localStorage.getItem('previousLogin');

  const { data: newVideosRaw } = useGetNewVideosQuery(lastLogin ?? '', {
    skip: !lastLogin,
    
  });

  const { data: newTests } = useGetNewTestsQuery(lastLogin ?? '', {
    skip: !lastLogin,
  });

        console.log(lastLogin);

  const [updateLastLogin] = useUpdateLastLoginMutation();

  const safeVideos: VideoType[] = (newVideosRaw ?? []).map((video) => ({
    ...video,
    uploadDate:
      typeof video.uploadDate === 'string'
        ? video.uploadDate
        : new Date(video.uploadDate).toISOString(),
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
      console.error('שגיאה בעדכון תאריך התחברות:', error);
    }
    setOpen(false);
  };

  const handleVideoClick = (video: VideoType) => {
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
        <DialogTitle>✨ תוכן חדש מחכה לך!</DialogTitle>
        <DialogContent dividers>
          {safeVideos.length > 0 && (
            <>
              <Typography variant="h6">🎥 סרטונים חדשים:</Typography>
              <List>
                {safeVideos.map((video) => (
                  <ListItem key={video._id} alignItems="flex-start" disablePadding>
                    <ListItemButton onClick={() => handleVideoClick(video)}>
                      <ListItemText
                        primary={
                          <Typography
                            color="primary"
                            sx={{ textDecoration: 'underline' }}
                          >
                            {video.originalVideoName || video.videoName}
                          </Typography>
                        }
                        secondary={`קורס: ${video.nameCours} | תאריך העלאה: ${new Date(
                          video.uploadDate
                        ).toLocaleDateString()}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {safeTests.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>
                📝 מבחנים חדשים:
              </Typography>
              <List>
                {safeTests.map((test) => (
                  <ListItem key={test._id}>
                    <ListItemText
                      primary={
                        <Link
                          href={`/HomeStudent/${encodeURIComponent(
                            test.courseName
                          )}`}
                          underline="hover"
                        >
                          {test.title || 'ללא שם'}
                        </Link>
                      }
                      secondary={`קורס: ${test.courseName}`}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            סגור
          </Button>
        </DialogActions>
      </Dialog>

      {/* דיאלוג לצפייה בסרטון */}
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
              src={`${serverUrl}/uploads/${encodeURIComponent(selectedVideo.nameCours)}/${encodeURIComponent(
                selectedVideo.videoPath
              )}`}
              controls
              style={{ width: '100%', borderRadius: '8px' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVideoDialogClose} variant="outlined">
            סגור וידאו
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewContentPopup;