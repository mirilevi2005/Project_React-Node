

// ///הצאטטטטטט

// // const express = require("express");
// // const http = require("http");
// // const socketIo = require("socket.io");
// // const mongoose = require("mongoose");
// // const cors = require("cors");

// // const app = express();
// // const server = http.createServer(app);
// // const io = socketIo(server, {
// //   cors: {
// //     origin: "http://localhost:5174", // ודא שזה כתובת הפרונט שלך
// //     methods: ["GET", "POST"],
// //   },
// // });

// // // התחברות ל-MongoDB
// // mongoose.connect("mongodb://127.0.0.1:27017/chatDB", {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// // // יצירת מודל להודעות
// // const MessageSchema = new mongoose.Schema({
// //   sender: String,
// //   message: String,
// //   timestamp: { type: Date, default: Date.now },
// // });
// // const Message = mongoose.model("Message", MessageSchema);

// // app.use(cors());
// // app.use(express.json());

// // // קבלת כל ההודעות מהשרת
// // app.get("/messages", async (req, res) => {
// //   const messages = await Message.find();
// //   res.json(messages);
// // });

// // io.on("connection", (socket) => {
// //   console.log("🔌 משתמש התחבר");

// //   socket.on("join_room", (room) => {
// //     socket.join(room);
// //     console.log(`🚪 משתמש הצטרף לחדר ${room}`);
// //   });

// //   // קבלת הודעה מהלקוח ושמירה בבסיס הנתונים
// //   socket.on("send_message", async (data) => {
// //     const { room, sender, message } = data;
// //     const newMessage = new Message({ sender, message });
// //     await newMessage.save();

// //     io.to(room).emit("receive_message", newMessage); // שולח לכל המשתמשים בחדר
// //   });

// //   socket.on("disconnect", () => {
// //     console.log("🚫 משתמש התנתק");
// //   });
// // });

// // server.listen(5001, () => {
// //   console.log("🚀 השרת רץ על פורט 5001");
// // });













// const express = require('express');
// const { spawn } = require('child_process');
// const path = require('path');
// const fs = require('fs'); // For checking if file exists

// const app = express();
// const port = 8080; // או כל פורט אחר שאתה משתמש בו

// app.use(express.json());

// // הגדרת נתיב בסיס לתיקיית ההעלאות שלך
// // שנה את 'uploads' אם התיקייה שלך נקראת אחרת או נמצאת במקום אחר
// const UPLOADS_DIR = path.join(__dirname, 'uploads');

// // Endpoint לתמלול וידאו
// // לדוגמה: POST /api/transcribe/CourseName/videoFile.mp4
// app.post('/api/transcribe/:courseName/:videoFileName', async (req, res) => {
//     const { courseName, videoFileName } = req.params;

//     // בנה את הנתיב המלא לקובץ הווידאו על השרת
//     const videoFilePath = path.join(UPLOADS_DIR, courseName, videoFileName);

//     // בדוק אם קובץ הווידאו קיים לפני שמנסים לתמלל
//     if (!fs.existsSync(videoFilePath)) {
//         console.error(`Video file not found: ${videoFilePath}`);
//         return res.status(404).json({ error: `Video file not found at ${videoFilePath}` });
//     }

//     // נתיב לסקריפט הפייתון
//     // שנה אם שמת את הסקריפט במקום אחר
//     const pythonScriptPath = path.join(__dirname, 'scripts', 'transcribe_video.py');

//     console.log(`Attempting to transcribe video: ${videoFilePath} using script: ${pythonScriptPath}`);

//     const pythonProcess = spawn('python', [pythonScriptPath, videoFilePath]);

//     let resultJsonString = '';
//     let errorOutput = '';

//     pythonProcess.stdout.on('data', (data) => {
//         resultJsonString += data.toString();
//     });

//     pythonProcess.stderr.on('data', (data) => {
//         errorOutput += data.toString();
//         console.error(`Python stderr: ${data}`); // טוב לדיבאגינג
//     });

//     pythonProcess.on('close', (code) => {
//         console.log(`Python script exited with code ${code}`);

//         if (code !== 0 || errorOutput) {
//             // גם אם הקוד הוא 0, ייתכן ש-stderr מכיל מידע שימושי או שגיאות לוגיקה מ-Python
//             // ננסה לפענח את הפלט גם אם הייתה שגיאה חלקית
//             try {
//                 const result = JSON.parse(resultJsonString);
//                 if (result.error) {
//                     console.error('Transcription error (from script output):', result.error);
//                     return res.status(500).json({ error: 'Transcription failed', details: result.error, pythonStderr: errorOutput });
//                 } else if (result.transcription) {
//                     // זה יכול לקרות אם יש פלט שגיאה ב-stderr אבל גם תמלול תקין ב-stdout
//                      return res.json({ transcription: result.transcription, warnings: errorOutput });
//                 }
//             } catch (parseError) {
//                 // אם לא הצלחנו לפענח את הפלט כ-JSON
//                 console.error('Failed to parse Python script output:', parseError);
//                 return res.status(500).json({ 
//                     error: 'Transcription process failed or produced invalid output.', 
//                     pythonExitCode: code,
//                     pythonStderr: errorOutput,
//                     rawOutput: resultJsonString 
//                 });
//             }
//         }
        
//         // אם הקוד הוא 0 ולא היו שגיאות ב-stderr, ננסה לפענח
//         try {
//             const result = JSON.parse(resultJsonString);
//             if (result.transcription) {
//                 // שמור את התמלול במסד נתונים אם צריך
//                 // db.saveTranscription(videoFileName, result.transcription);
//                 return res.json({ transcription: result.transcription });
//             } else if (result.error) { // שגיאה שהוגדרה על ידי סקריפט הפייתון
//                 return res.status(400).json({ error: result.error });
//             } else {
//                  return res.status(500).json({ error: "Unknown error in transcription script output.", rawOutput: resultJsonString});
//             }
//         } catch (e) {
//             console.error('Error parsing transcription result JSON:', e);
//             return res.status(500).json({ error: 'Could not parse transcription result.', rawOutput: resultJsonString });
//         }
//     });

//     pythonProcess.on('error', (err) => {
//         console.error('Failed to start Python subprocess.', err);
//         res.status(500).json({ error: 'Failed to start transcription process', details: err.message });
//     });
// });

// // (אופציונלי) הגדרת Express להגשת קבצים סטטיים (כמו הסרטונים שלך)
// // זה מאפשר לקוד ה-React שלך לגשת לסרטונים דרך http://localhost:8080/uploads/CourseName/videoFile.mp4
// // ודא שהנתיב 'uploads' תואם למבנה שלך
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//     console.log(`Uploads directory configured at: ${UPLOADS_DIR}`);
//     console.log(`To test transcription, POST to /api/transcribe/:courseName/:videoFileName`);
// });