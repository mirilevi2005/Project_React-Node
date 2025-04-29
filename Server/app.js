


const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/dbConn');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser'); // ✅ ייבוא cookie-parser

// קובץ אפשרויות CORS
const corsOptions = require("./config/corsOptions");

// קונפיגורציה למידלוורים
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// התחברות למסד הנתונים
connectDB();

// קבצים סטטיים (כגון וידאוים שהועלו)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));///לדעתי פה צריכים למחוק את המילה uploads

// ייבוא ראוטים
const LearningMaterialsRouter = require('./router/LearningMaterialsRouter');
const singIn = require('./router/signIn'); // ✅ ייבוא ראוט של התחברות והרשמה
const signUp=require('./router/signUp')

// שימוש בראוטים
app.use('/HomeLacturer', LearningMaterialsRouter);
app.use('/', singIn);
app.use('/SignUp', signUp);

// חיבור למסד נתונים והרצת השרת
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
  });
});

// טיפול בשגיאות חיבור למסד
mongoose.connection.on('error', err => {
  console.error('Error connecting to MongoDB:', err);
});
