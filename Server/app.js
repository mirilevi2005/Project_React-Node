


// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 8080;
// const mongoose = require('mongoose');
// const cors = require("cors");
// require('dotenv').config();
// const connectDB = require('./config/dbConn');
// const multer = require('multer');
// const path = require('path');
// const cookieParser = require('cookie-parser'); // ✅ ייבוא cookie-parser

// // קובץ אפשרויות CORS
// const corsOptions = require("./config/corsOptions");

// // קונפיגורציה למידלוורים
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(cookieParser());

// // התחברות למסד הנתונים
// connectDB();

// // קבצים סטטיים (כגון וידאוים שהועלו)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));///לדעתי פה צריכים למחוק את המילה uploads

// // ייבוא ראוטים
// const LearningMaterialsRouter = require('./router/LearningMaterialsRouter');
// const singIn = require('./router/signIn'); // ✅ ייבוא ראוט של התחברות והרשמה
// const signUp=require('./router/signUp')

// // שימוש בראוטים
// app.use('/HomeLacturer', LearningMaterialsRouter);
// app.use('/', singIn);
// app.use('/SignUp', signUp);

// // חיבור למסד נתונים והרצת השרת
// mongoose.connection.once('open', () => {
//   console.log('Connected to MongoDB');
//   app.listen(PORT, () => { 
//     console.log(`Server running on port ${PORT}`);
//   });
// });

// // טיפול בשגיאות חיבור למסד
// mongoose.connection.on('error', err => {
//   console.error('Error connecting to MongoDB:', err);
// });





const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');

const corsOptions = require("./config/corsOptions");

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
      origin: '*',
  },
});

// 👇 החלק הקריטי – שמירת ה־io באפליקציה
app.set('io', io);

// התחברות למסד נתונים
connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// סטטיים
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ראוטים
const LearningMaterialsRouter = require('./router/LearningMaterialsRouter');
const singIn = require('./router/signIn');
const signUp = require('./router/signUp');

app.use('/HomeLacturer', LearningMaterialsRouter);
app.use('/', singIn);
app.use('/SignUp', signUp);

// פתיחת חיבור למסד נתונים והרצת השרת
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  server.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${process.env.PORT || 8080}`);
  });
});

// טיפול בשגיאת התחברות למסד
mongoose.connection.on('error', err => {
  console.error('Error connecting to MongoDB:', err);
});
