const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/videos/'); // שמירה בתיקייה uploads/videos/
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // יצירת שם ייחודי לקובץ
    }
});

const upload = multer({ storage: storage });


