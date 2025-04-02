

// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 8080;

// const mongoose = require('mongoose');
// const cors = require("cors");
// require('dotenv').config();
// const connectDB = require('./config/dbConn');
// const multer = require('multer');
// const path = require('path');
// const upload = multer({ dest: 'uploads/videos' });

// const corsOptions = require("./config/corsOptions");

// app.use(cors(corsOptions));
// app.use(express.json());
// connectDB();
// const LearningMaterials = require('./router/LearningMaterialsRouter');
// app.use('/HomeLacturer', LearningMaterials);

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

// הגדרת העלאת קבצים
const upload = multer({ dest: 'uploads/videos' });

const corsOptions = require("./config/corsOptions");

app.use(cors(corsOptions));
app.use(express.json());

// התחברות למסד הנתונים
connectDB();

// ✅ הוספת static כדי שהשרת יוכל להגיש קבצי וידאו
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ייבוא והגדרת ראוטים
const LearningMaterials = require('./router/LearningMaterialsRouter');
app.use('/HomeLacturer', LearningMaterials);

// חיבור למסד הנתונים
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
  });
});

// טיפול בשגיאות חיבור למונגו
mongoose.connection.on('error', err => {
  console.error('Error connecting to MongoDB:', err);
});

