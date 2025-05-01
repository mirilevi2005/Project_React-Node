
// import {  useGetAllMaterialsByNameCourseQuery } from "../../redux/slice/api/materialsApi";

// interface Props {
//   courseName: string;
// }

// const VideoList = ({ courseName }: Props) => {
//   const { data, isError, isLoading } = useGetAllMaterialsByNameCourseQuery(courseName);
 

//   // 🔹 וידוא שהנתונים לא undefined
//   const videos = data?.videos || [];



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
//           <p>{video.finishDate}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VideoList;

import { useGetAllMaterialsByNameCourseQuery } from "../../redux/slice/api/materialsApi";
import { Video } from "../../interface/VideoMaterial";

interface Props {
  courseName: string;
}

const VideoList = ({ courseName }: Props) => {
  const { data, isError, isLoading } = useGetAllMaterialsByNameCourseQuery(courseName);
  
  // 🔹 וידוא שהנתונים לא undefined
  const videos: Video[] = data?.videos || [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading videos.</p>;
  if (videos.length === 0) return <p>No videos available</p>;

  return (
    <div className="video-list">
      {videos.map((video) => {
        // 🔹 יצירת תאריך נוכחי להשוואה
        const currentDate = new Date();
        const finishDate = new Date(video.finishDate);
        // 🔹 אם התאריך הנוכחי עבר את finishDate, לא ניתן להציג את הסרטון
        const isVideoExpired = currentDate > finishDate;
        return (
          <div key={video._id} className="video-item">
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

              {isVideoExpired && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "center",
                    pointerEvents: "none",
                  }}
                >
                  הצפייה אינה זמינה — תאריך פג
                </div>
              )}
            </div>

            <p>סיום צפייה: {finishDate.toLocaleDateString()}</p>
          </div>
        );
      })}
    </div>
  );
};

export default VideoList;
