
// import Stack from "@mui/material/Stack";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useDeleteMaterialMutation, useGetAllMaterialsByNameCourseQuery } from "../redux/slice/api/materialsApi";
// import { useDispatch } from "react-redux";
// import { deleteVideo } from "../redux/slice/videoSlice";

// interface Props {
//   courseName: string;
// }

// const VideoList = ({ courseName }: Props) => {
//   const { data, isError, isLoading, refetch } = useGetAllMaterialsByNameCourseQuery(courseName);
//   const [deleteMaterial] = useDeleteMaterialMutation();
//   const dispatch = useDispatch();

//   const videos = data?.videos || [];

//   const handleDelete = async (videoId: string) => {
//     try {
//       await deleteMaterial(videoId).unwrap();
//       dispatch(deleteVideo(videoId));
//       refetch();
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error loading videos.</p>;
//   if (videos.length === 0) return <p>No videos available</p>;

//   return (
//     <div className="video-list">
//       {videos.map((video) => {
       
       

//         return (
//           <div key={video._id} className="video-item" style={{ position: "relative", marginBottom: "24px" }}>
//             <h3>{video.videoName}</h3>

//             <div style={{ position: "relative", display: "inline-block" }}>
//             <video width="600" controls>
//   <source src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`} type="video/mp4" />
//   הדפדפן שלך לא תומך בווידאו.
// </video>
//             </div>
//             <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
//               <IconButton onClick={() => handleDelete(video._id)} aria-label="delete" size="large">
//                 <DeleteIcon />
//               </IconButton>
//             </Stack>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default VideoList;

import { useState } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  useDeleteMaterialMutation,
  useGetAllMaterialsByNameCourseQuery,
  useUpDateMaterialMutation,
} from "../redux/slice/api/materialsApi";
import { deleteVideo } from "../redux/slice/videoSlice";
import { Video } from "../interface/VideoMaterial";

interface Props {
  courseName: string;
}

const VideoList = ({ courseName }: Props) => {
  const { data, isError, isLoading, refetch } = useGetAllMaterialsByNameCourseQuery(courseName);
  const [deleteMaterial] = useDeleteMaterialMutation();
  const [upDateMaterial] = useUpDateMaterialMutation();
  const dispatch = useDispatch();
  const videos = data?.videos || [];

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");

  const handleDelete = async (videoId: string) => {
    try {
      await deleteMaterial(videoId).unwrap();
      dispatch(deleteVideo(videoId));
      refetch();
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleEdit = (video: Video) => {
    setEditingId(video._id);
    setEditedName(video.videoName);
  };

  const handleSave = async (video: Video) => {
    const formData = new FormData();
    formData.append("videoName", editedName);
    formData.append("nameCours", courseName);
    formData.append("_id", video._id); // חובה לשלוח ID לעדכון

    try {
      await upDateMaterial(formData).unwrap();
      setEditingId(null);
      refetch();
    } catch (error) {
      console.error("Error updating video name:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedName("");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading videos.</p>;
  if (videos.length === 0) return <p>No videos available</p>;

  return (
    <div className="video-list">
      {videos.map((video) => (
        <div key={video._id} className="video-item" style={{ marginBottom: "24px" }}>
          {editingId === video._id ? (
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <TextField
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                variant="standard"
              />
              <IconButton onClick={() => handleSave(video)} aria-label="save">
                <CheckIcon />
              </IconButton>
              <IconButton onClick={handleCancel} aria-label="cancel">
                <CloseIcon />
              </IconButton>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <h3>{video.videoName}</h3>
              <IconButton onClick={() => handleEdit(video)} aria-label="edit">
                <EditIcon />
              </IconButton>
            </Stack>
          )}

          <video width="600" controls>
            <source
              src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`}
              type="video/mp4"
            />
            הדפדפן שלך לא תומך בווידאו.
          </video>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1 }}>
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

