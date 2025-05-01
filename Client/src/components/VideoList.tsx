
// import Stack from "@mui/material/Stack";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useDeleteMaterialMutation, useGetAllMaterialsByNameCourseQuery } from "../redux/slice/api/materialsApi";
// import { useDispatch } from "react-redux";
// import { deleteVideo } from "../redux/slice/slice";
// import{Video,VideoListProps} from '../interface/VideoMaterial'
// const VideoList = ({ courseName }: VideoListProps) => {
//   const { data , isError, isLoading } = useGetAllMaterialsByNameCourseQuery(courseName);
//   const [deleteMaterial] = useDeleteMaterialMutation();
//   const videos: Video[] = Array.isArray(data) ? data : [];
//   const dispatch = useDispatch();
//   const handleDelete = async (videoId: string) => {
//     try {
//       await deleteMaterial(videoId).unwrap();
//       dispatch(deleteVideo(videoId));
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error loading videos.</p>;
//   if (!videos || videos.length === 0) return <p>No videos available</p>;

//   return (
//     <div className="video-list">
//       {videos.map((video, index) => (
//         <div key={index} className="video-item">
//           <h3>{video.videoName}</h3>
//           <video controls width="600">
//           <source src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`} type="video/mp4" />
//             הדפדפן שלך לא תומך בווידאו.
//           </video>
          
//           🔻 כפתור מחיקה לסרטון
//           <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
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






























// import Stack from "@mui/material/Stack";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useDeleteMaterialMutation, useGetAllMaterialsByNameCourseQuery } from "../redux/slice/api/materialsApi";
// import { useDispatch } from "react-redux";
// import { deleteVideo } from "../redux/slice/slice";
// import{Video } from '../interface/VideoMaterial'

// interface Props {
//   courseName: string;
// }

// const VideoList = ({ courseName }: Props) => {
//   const { data, isError, isLoading, refetch } = useGetAllMaterialsByNameCourseQuery(courseName);
//   const [deleteMaterial] = useDeleteMaterialMutation();
//   const dispatch = useDispatch();

//   // 🔹 וידוא שהנתונים לא undefined
//   const videos: Video[] = Array.isArray(data) ? data : [];
//   const handleDelete = async (videoId: string) => {
//     try {
//       // מצא את הסרטון מתוך המערך
//       const videoToDelete = videos.find((video) => video._id === videoId);
  
//       if (videoToDelete) {
//         // מחיקת הסרטון מהשרת
//         await deleteMaterial(videoId).unwrap();
  
//         // שליחת ה- videoPath של הסרטון שנמחק ל-redux
//         dispatch(deleteVideo({ videoPath: videoToDelete.videoPath }));
  
//         // מרענן את רשימת הסרטונים
//         refetch(); // 🔄 מרענן את הרשימה אחרי מחיקה
//       }
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error loading videos.</p>;
//   if (videos.length === 0) return <p>No videos available</p>;

//   return (
//     <div className="video-list">
//       {videos.map((video) => (
//         <div key={video._id} className="video-item">
//           <h3>{video.videoName}</h3>
//           <video controls width="600">
//             <source src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`} type="video/mp4" />
//             הדפדפן שלך לא תומך בווידאו.
//           </video>
          
//           {/* 🔻 כפתור מחיקה לסרטון */}
//           <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
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





































// import Stack from "@mui/material/Stack";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useDeleteMaterialMutation, useGetAllMaterialsByNameCourseQuery } from "../redux/slice/api/materialsApi";
// import { useDispatch } from "react-redux";
// import { deleteVideo } from "../redux/slice/slice";
// import { Video } from '../interface/VideoMaterial';

// interface Props {
//   courseName: string;
// }

// const VideoList = ({ courseName }: Props) => {
//   const { data, isError, isLoading, refetch } = useGetAllMaterialsByNameCourseQuery(courseName);
//   const [deleteMaterial] = useDeleteMaterialMutation();
//   const dispatch = useDispatch();

//   // 🔹 וידוא שהנתונים לא undefined והם סוג של מערך
//   const videos: Video[] = Array.isArray(data) ? data : [];

//   const handleDelete = async (videoId: string) => {
//     try {
//       // מצא את הסרטון מתוך המערך
//       const videoToDelete = videos.find((video) => video._id === videoId);

//       if (videoToDelete) {
//         // מחיקת הסרטון מהשרת
//         await deleteMaterial(videoId).unwrap();

//         // שליחת ה- videoPath של הסרטון שנמחק ל-redux
//         dispatch(deleteVideo({ videoPath: videoToDelete.videoPath }));

//         // מרענן את רשימת הסרטונים
//         refetch(); // 🔄 מרענן את הרשימה אחרי מחיקה
//       }
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error loading videos.</p>;
//   if (videos.length === 0) return <p>No videos available</p>;

//   return (
//     <div className="video-list">
//       {videos.map((video) => (
//         <div key={video._id} className="video-item">
//           <h3>{video.videoName}</h3>
//           <video controls width="600">
//             <source src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`} type="video/mp4" />
//             הדפדפן שלך לא תומך בווידאו.
//           </video>

//           {/* 🔻 כפתור מחיקה לסרטון */}
//           <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
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





























import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteMaterialMutation, useGetAllMaterialsByNameCourseQuery } from "../redux/slice/api/materialsApi";
import { useDispatch } from "react-redux";
import { deleteVideo } from "../redux/slice/slice";
import VideoOfMaterial from "./VideoOfMaterial";

interface Props {
  courseName: string;
}

const VideoList = ({ courseName }: Props) => {
  const { data, isError, isLoading, refetch } = useGetAllMaterialsByNameCourseQuery(courseName);
  const [deleteMaterial] = useDeleteMaterialMutation();
  const dispatch = useDispatch();

  // 🔹 וידוא שהנתונים לא undefined
  const videos = data?.videos || [];

  const handleDelete = async (videoId: string) => {
    try {
      await deleteMaterial(videoId).unwrap();
      dispatch(deleteVideo(videoId));
      refetch(); // 🔄 מרענן את הרשימה אחרי מחיקה
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading videos.</p>;
  if (videos.length === 0) return <p>No videos available</p>;

  return (
    <div className="video-list">
      {videos.map((video) => (
        <div key={video._id} className="video-item">
          <h3>{video.videoName}</h3>
          <video controls width="600">
            <source src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`} type="video/mp4" />
            הדפדפן שלך לא תומך בווידאו.
          </video>
          
          {/* 🔻 כפתור מחיקה לסרטון */}
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <IconButton onClick={() => handleDelete(video._id)} aria-label="delete" size="large">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
