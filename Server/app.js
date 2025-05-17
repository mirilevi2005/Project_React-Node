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
app.use(function(req, res, next) {
  res.setTimeout(5000000, function(){
    console.log('Request has timed out.');
    res.send(408); // Error 408 is request timeout
  });
  next();
});
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// התחברות למסד הנתונים
connectDB();

// קבצים סטטיים (כגון וידאוים שהועלו)

// ייבוא ראוטים
const LearningMaterialsRouter = require('./router/LearningMaterialsRouter');
const singIn = require('./router/signIn'); // ✅ ייבוא ראוט של התחברות והרשמה
const signUp=require('./router/signUp')
const Test = require('./router/TestRouter');


// שימוש בראוטים
app.use('/test',Test)
app.use('/HomeLacturer', LearningMaterialsRouter);
app.use('/', singIn);
app.use('/SignUp', signUp);
app.use("/student-submissions", Test);

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
