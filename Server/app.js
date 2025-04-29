
// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 8080;
// const mongoose = require('mongoose');
// const cors = require("cors");
// require('dotenv').config();
// const connectDB = require('./config/dbConn');
// const multer = require('multer');
// const path = require('path');

// // הגדרת העלאת קבצים
// const upload = multer({ dest: 'uploads' });

// const corsOptions = require("./config/corsOptions");

// app.use(cors(corsOptions));
// app.use(express.json());

// // התחברות למסד הנתונים
// connectDB();

// // ✅ הוספת static כדי שהשרת יוכל להגיש קבצי וידאו
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// // ייבוא והגדרת ראוטים
// const LearningMaterials = require('./router/LearningMaterialsRouter');
// app.use('/HomeLacturer', LearningMaterials);
// // app.use("/login", require("./routes/authRoute"))
// // app.use("/api/auth", require("./routes/authRoute"))



// // חיבור למסד הנתונים
// mongoose.connection.once('open', () => {
//   console.log('Connected to MongoDB');
//   app.listen(PORT, () => { 
//     console.log(`Server running on port ${PORT}`);
//   });
// });

// // טיפול בשגיאות חיבור למונגו
// mongoose.connection.on('error', err => {
//   console.error('Error connecting to MongoDB:', err);
// });








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
app.use("/uploads", express.static(path.join(__dirname, "uploadsררר")));///לדעתי פה צריכים למחוק את המילה uploads

// ייבוא ראוטים
const LearningMaterialsRouter = require('./router/LearningMaterialsRouter');
const authRoutes = require('./router/authRoutes'); // ✅ ייבוא ראוט של התחברות והרשמה


// שימוש בראוטים
app.use('/HomeLacturer', LearningMaterialsRouter);
app.use('/', authRoutes);

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
