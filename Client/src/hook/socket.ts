import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080"); // שנה לכתובת שלך בפרודקשן

export const useSocket = (onNewVideo: (video: { title: string, url: string }) => void) => {
  useEffect(() => {
    socket.on("new-video", onNewVideo);

    return () => {
      socket.off("new-video", onNewVideo);
    };
  }, [onNewVideo]);
};
