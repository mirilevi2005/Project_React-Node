
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteMaterialMutation, useGetAllMaterialsByNameCourseQuery } from "../redux/slice/api/materialsApi";
import { useDispatch } from "react-redux";
import { deleteVideo } from "../redux/slice/videoSlice";

interface Props {
  courseName: string;
}

const VideoList = ({ courseName }: Props) => {
  const { data, isError, isLoading, refetch } = useGetAllMaterialsByNameCourseQuery(courseName);
  const [deleteMaterial] = useDeleteMaterialMutation();
  const dispatch = useDispatch();

  const videos = data?.videos || [];

  const handleDelete = async (videoId: string) => {
    try {
      await deleteMaterial(videoId).unwrap();
      dispatch(deleteVideo(videoId));
      refetch();
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading videos.</p>;
  if (videos.length === 0) return <p>No videos available</p>;

  return (
    <div className="video-list">
      {videos.map((video) => {
        const currentDate = new Date();
        const finishDate = new Date(video.finishDate);
        const isVideoExpired = currentDate > finishDate;

        return (
          <div key={video._id} className="video-item" style={{ position: "relative", marginBottom: "24px" }}>
            <h3>{video.videoName}</h3>

            <div style={{ position: "relative", display: "inline-block" }}>
              <video
                width="600"
                controls={!isVideoExpired}
                style={{ pointerEvents: isVideoExpired ? "none" : "auto" }}
              >
                <source src={`http://localhost:8080/uploads/${courseName}/${video.videoPath}`} type="video/mp4" />
                הדפדפן שלך לא תומך בווידאו.
              </video>
            </div>

    

            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <IconButton onClick={() => handleDelete(video._id)} aria-label="delete" size="large">
                <DeleteIcon />
              </IconButton>
            </Stack>
          </div>
        );
      })}
    </div>
  );
};

export default VideoList;

