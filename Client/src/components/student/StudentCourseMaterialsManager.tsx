// import React, { useState } from "react";
import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VideoIcon from "@mui/icons-material/VideoLibrary";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slice/authStateSlice";
import VideoList from "./VideoList";
import TestForStudent from "./TestForStudent";
import NewContentPopup from "./NewContentPopup";
import StudentCourseScoresChart from "./StudentCourseScoresChart";

const StudentCourseMaterialsManager = () => {
  const theme = useTheme();
  const [activePanel, setActivePanel] = useState<"videos" | "tests" | "chart" | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const urlParts = window.location.pathname.split("/");
  const courseName = urlParts[urlParts.length - 1];
  const student = useSelector(selectCurrentUser);
  const studentId = student?._id;
  const togglePanel = (panel: "videos" | "tests" | "chart") => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const renderContent = () => {
    switch (activePanel) {
      case "videos":
        return <VideoList courseName={courseName} />;
      case "tests":
        return (
          <TestForStudent courseName={courseName} studentId={studentId!} />
        );
      case "chart":
        const StudentCourseMaterialsManager = ({
          courseName,
          studentId,
        }: {
          courseName: string;
          studentId?: string;
        }) => {
          if (!studentId) {
            return <div>Loading student details...</div>;
          }
          return (
            <StudentCourseScoresChart
              courseName={courseName}
              studentId={studentId}
            />
          );
        };

        return (
          <StudentCourseScoresChart
            courseName={courseName}
            studentId={studentId!}
          />
        );
      default:
        return null;
    }
  };

  const cardStyle = (panel: string) => ({
  height: 250, 
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between", 
  transition: "transform 0.2s",
  "&:hover": { transform: "translateY(-5px)" },
  border:
    activePanel === panel
      ? `2px solid ${theme.palette.primary.main}`
      : "none",
});


  const buttonVariant = (panel: string) =>
    activePanel === panel ? "contained" : "outlined";

  const buttonText = (panel: string) => {
    if (activePanel === panel) return "Hide";
    switch (panel) {
      case "videos":
        return "Show Videos";
      case "tests":
        return "Show Tests";
      case "chart":
        return "Show Chart";
      default:
        return "";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ width:'90vw' }}>
    <Grid container spacing={3}>
  {/* Videos Card */}
  <Grid item xs={12} md={4}>
    <Card sx={cardStyle("videos")}>
      <CardContent sx={{ textAlign: "center" }}>
        <VideoIcon
          sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
        />
        <Typography variant="h6">Educational Videos</Typography>
        <Typography variant="body2">View course videos</Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant={buttonVariant("videos")}
          onClick={() => togglePanel("videos")}
        >
          {buttonText("videos")}
        </Button>
      </CardActions>
    </Card>
  </Grid>

  {/* Tests Card */}
  <Grid item xs={12} md={4}>
    <Card sx={cardStyle("tests")}>
      <CardContent sx={{ textAlign: "center" }}>
        <CalendarTodayIcon
          sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
        />
        <Typography variant="h6">Tests</Typography>
        <Typography variant="body2">View tests</Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant={buttonVariant("tests")}
          onClick={() => togglePanel("tests")}
        >
          {buttonText("tests")}
        </Button>
      </CardActions>
    </Card>
  </Grid>

  {/* Scores Chart Card */}
  <Grid item xs={12} md={4}>
    <Card sx={cardStyle("chart")}>
      <CardContent sx={{ textAlign: "center" }}>
        <TrendingUpIcon
          sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
        />
        <Typography variant="h6">Scores Chart</Typography>
        <Typography variant="body2">
          Comparison of student’s scores to the average
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant={buttonVariant("chart")}
          onClick={() => togglePanel("chart")}
        >
          {buttonText("chart")}
        </Button>
      </CardActions>
    </Card>
  </Grid>
</Grid>

      <Box sx={{ mt: 4 }}>{renderContent()}</Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="Cannot view — the video is no longer available"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      <NewContentPopup />
    </Container>
  );
};

export default StudentCourseMaterialsManager;
