// import { useState } from "react";

// const UploadMaterial = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     const formData = new FormData();
//     formData.append("video", selectedFile); 
//     formData.append("nameCours", "Course Name"); 
//     formData.append("finishDate", new Date().toISOString());

//     try {
//       const response = await fetch("http://localhost:5000/api/material", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Upload failed");
//       }

//       console.log("Uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="video/*" onChange={handleFileChange} />
//       {/* <button onClick={handleUpload}>Upload</button> */}
//     </div>
//   );
// };

// export default UploadMaterial;
