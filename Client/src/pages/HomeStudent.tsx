
// import HomePageStudent from '../components/student/HomePageStudent';
// import { useSelector } from 'react-redux';
// import { selectCurrentUser } from '../redux/slice/authStateSlice';

// const HomeStudent = () => {
//   const user = useSelector(selectCurrentUser);
//   return (
//     <>
//       <h1>student {user?.userName}</h1>
//       <HomePageStudent />
//     </>
//   );
// };

// export default HomeStudent;



import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../redux/slice/authStateSlice";
import { RootState } from "../redux/store";
import {
  setNewVideoNotification,
  hideVideoNotification,
} from "../redux/slice/videoSlice";
import HomePageStudent from "../components/student/HomePageStudent";
import { Snackbar, Alert } from "@mui/material";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:8080"); // ודא שכתובת השרת נכונה

const HomeStudent = () => {
  const user = useSelector(selectCurrentUser);
  const newVideo = useSelector((state: RootState) => state.videos.newVideo);
  const snackbarOpen = useSelector((state: RootState) => state.videos.snackbarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("new-video", (video) => {
      console.log("📡 סרטון חדש התקבל:", video);
      dispatch(
        setNewVideoNotification({
          title: video.videoName,
          url: `/video/${video._id}`,
        })
      );
    });

    return () => {
      socket.off("new-video");
    };
  }, [dispatch]);

  const handleClick = () => {
    if (newVideo) {
      navigate(newVideo.url); // אם הסרטון חדש, נווט אליו
      dispatch(hideVideoNotification()); // הסתר את ההתראה
    }
  };

  return (
    <>
      <h1>student {user?.userName}</h1>
      <HomePageStudent />
      <Snackbar
        open={snackbarOpen}
        onClose={() => dispatch(hideVideoNotification())}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="info"
          variant="filled"
          onClose={() => dispatch(hideVideoNotification())}
          sx={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          📽️ סרטון חדש עלה: {newVideo?.title}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HomeStudent;
