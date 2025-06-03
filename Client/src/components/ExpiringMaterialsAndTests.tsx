
import React from 'react';
import {
  Grid,
  Paper,
  Stack,
  Box,
  Typography,
  Chip,
  Button,
} from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Link } from 'react-router-dom';
import { useGetExpiredMaterialsLast5DaysQuery } from '../redux/slice/api/materialsApi';
import { useGetRecentTestsForStudentQuery } from '../redux/slice/api/testApi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Video } from '../interface/VideoMaterial';

type Test = {
  _id: string;
  title: string;
  lastDate: string | Date;
  courseName?: string;
};

const getDaysLeft = (expireDateStr: string) => {
  const expireDate = new Date(expireDateStr);
  const today = new Date();
  const diffTime = expireDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const ExpiringMaterialsAndTests = () => {
  const studentId = useSelector((state: RootState) => state.userInfo.user?._id);

  const {
    data: videosData,
    isLoading: loadingVideos,
    isError: errorVideos,
  } = useGetExpiredMaterialsLast5DaysQuery();

  const {
    data: testsData,
    isLoading: loadingTests,
    isError: errorTests,
  } = useGetRecentTestsForStudentQuery(studentId!, {
    skip: !studentId,
  });

  if (loadingVideos || loadingTests) return <p>טוען...</p>;
  if (errorVideos || errorTests) return <p>שגיאה בטעינת הנתונים</p>;

  // וידוא שהנתונים הם מערכים
  const videos: Video[] = Array.isArray(videosData) ? videosData : [];
  const tests: Test[] = Array.isArray(testsData) ? testsData : [];

  // המר תאריכים מסוג Date למחרוזת ISO לפני השימוש בפונקציה
  const normalizedVideos = videos.map((v) => ({
    ...v,
    finishDate:
      v.finishDate instanceof Date
        ? v.finishDate.toISOString()
        : v.finishDate,
  }));

  const normalizedTests = tests.map((t:Test) => ({
    ///מאיזה סוג האובייקט t????????????????????
    ...t,
    lastDate: t.lastDate instanceof Date ? t.lastDate.toISOString() : t.lastDate,
  }));

  const upcomingItems = [
    ...normalizedVideos.map((v) => ({
      id: v._id,
      title: v.videoName,
      expireDate: v.finishDate,
      type: 'סרטון',
      daysLeft: getDaysLeft(v.finishDate),
      course: v.nameCours || 'אחר',
    })),
    ...normalizedTests.map((t) => ({
      id: t._id,
      title: t.title,
      expireDate: t.lastDate,
      type: 'מבחן',
      daysLeft: getDaysLeft(t.lastDate),
      course: t.courseName || 'אחר',
    })),
  ].sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <Grid container spacing={4} sx={{ mt: 2 }}>
      <Grid item xs={12} md={8}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            height: '100%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            חומרים ומבחנים שפוקעים ב-5 הימים הקרובים
          </Typography>

          <Stack spacing={2} sx={{ mt: 1 }}>
            {upcomingItems.length === 0 ? (
              <Typography>אין חומרים או מבחנים שפוקעים בטווח זה.</Typography>
            ) : (
              upcomingItems.map((item) => (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 2,
                    bgcolor: item.daysLeft <= 5 ? '#fff1f2' : '#ffffff',
                    border: '1px solid #f1f5f9',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FolderOpenIcon
                      sx={{
                        color:
                          item.course.toLowerCase() === 'ai'
                            ? '#1e40af'
                            : item.course.toLowerCase() === 'cybersecurity'
                            ? '#b91c1c'
                            : '#166534',
                        mr: 2,
                      }}
                    />
                    <Box>
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                        sx={{ color: '#1e293b' }}
                      >
                        [{item.type}] {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        פוקע בתאריך:{' '}
                        {new Date(item.expireDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Chip
                    label={
                      item.daysLeft <= 5
                        ? `${item.daysLeft} ימים נותרו`
                        : item.course
                    }
                    size="small"
                    color={item.daysLeft <= 5 ? 'error' : 'default'}
                    variant={item.daysLeft <= 5 ? 'outlined' : 'filled'}
                    sx={{
                      fontWeight: 'medium',
                      borderRadius: '12px',
                      bgcolor:
                        item.daysLeft > 5
                          ? item.course.toLowerCase() === 'ai'
                            ? '#dbeafe'
                            : item.course.toLowerCase() === 'cybersecurity'
                            ? '#fee2e2'
                            : '#dcfce7'
                          : 'transparent',
                    }}
                  />
                </Paper>
              ))
            )}
          </Stack>

        </Paper>
      </Grid>
    </Grid>
  );
};

export default ExpiringMaterialsAndTests;