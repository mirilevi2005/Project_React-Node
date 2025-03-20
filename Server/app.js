
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/dbConn');


// חבר את מסד הנתונים לפני התחלת השרת
connectDB();

app.use(express.json());

const corsOptions = require("./config/corsOptions");

app.use(cors(corsOptions));

// ייבוא המודולים הנכונים
const LearningMaterials = require('./router/LearningMaterialsRouter');
//const Lecturer = require('./router/LecturerRouter');  // וודא שהשמות נכונים
//const Student = require('./router/StudentRouter');  // וודא שהשמות נכונים




// הגדרת הנתיבים (routes)
app.use('/NameOfLecturer/nameMaterial', LearningMaterials);
//app.use('/NameOfLecturer', Lecturer);
//app.use('/NameOfStudent', Student);


mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB ');
  app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
  });
});

// טיפול בשגיאות חיבור למונגו
mongoose.connection.on('error', err => {
  console.error('Error connecting to MongoDB:', err);
});








