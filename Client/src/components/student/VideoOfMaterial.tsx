// import { useState, useEffect } from "react";

// import "../../css/VideoOfMaterial.css";

// import VideoList from "../student/VideoList";
// const VideoOfMaterial = () => {
//     const [uploadedCourse, setUploadedCourse] = useState<string | null>(null);
//     const urlParts = window.location.pathname.split('/');
//     const courseName = urlParts[urlParts.length - 1]; 
//     useEffect(() => {
//         setUploadedCourse(courseName); // עדכון סטייט בצורה תקינה
//     }, [courseName]);

//     return (
//         <div className="upload-container">
//             {/* הצגת רשימת הסרטונים רק כאשר יש שם קורס */}
//             {uploadedCourse && <VideoList courseName={uploadedCourse} />}
//         </div>
//     );
// };

// export default VideoOfMaterial;

import { useState, useEffect } from "react";
import "../../css/VideoOfMaterial.css";

import VideoList from "../student/VideoList";
import TestForStudent from "./TestForStudent";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slice/authStateSlice";

const VideoOfMaterial = () => {
  const [uploadedCourse, setUploadedCourse] = useState<string | null>(null);
  const urlParts = window.location.pathname.split("/");
  const courseName = urlParts[urlParts.length - 1];

  const student = useSelector(selectCurrentUser);
  console.log(student);
  const studentId = student?._id;
  useEffect(() => {
    setUploadedCourse(courseName);
  }, [courseName]);

  return (
    <div className="upload-container">
      {studentId && (
        <TestForStudent courseName={courseName} studentId={studentId} />
      )}

      {uploadedCourse && <VideoList courseName={uploadedCourse} />}
    </div>
  );
};

export default VideoOfMaterial;