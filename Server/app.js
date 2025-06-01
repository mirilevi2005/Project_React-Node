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

// app.get('*', (req, res) => {
// res.sendFile(path.resolve(__dirname, '../client/components/HomePage'));
// });

// ייבוא ראוטים
const LearningMaterialsRouter = require('./router/LearningMaterialsRouter');
const singIn = require('./router/signIn'); // ✅ ייבוא ראוט של התחברות והרשמה
const signUp=require('./router/signUp')
const Test = require('./router/TestRouter');
const statsRouter = require('./router/statsRouter');
const newMaterial = require('./router/newMaterial');
// const magicLinkRouter=require('./router/auth')
// קבצים סטטיים (כגון וידאוים שהועלו)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// שימוש בראוטים
// app.use('/auth', magicLinkRouter);
app.use('/test',Test)
app.use('/HomeLacturer', LearningMaterialsRouter);
app.use('/', singIn);
app.use('/SignUp', signUp);
app.use('/stats', statsRouter);
app.use('/users', newMaterial);///צריך להחילףapp.
// use(cookieParser()); //את הניתוב של הuser


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
