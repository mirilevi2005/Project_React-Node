const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/dbConn');
// const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser'); 

const corsOptions = require("./config/corsOptions");

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


connectDB();


const LearningMaterialsRouter = require('./router/LearningMaterialsRouter');
const singIn = require('./router/signIn');
const signUp=require('./router/signUp')
const Test = require('./router/TestRouter');
const statsRouter = require('./router/statsRouter');
const newMaterial = require('./router/newMaterial');


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/test',Test)
app.use('/HomeLecturer', LearningMaterialsRouter);
app.use('/', singIn);
app.use('/SignUp', signUp);
app.use('/stats', statsRouter);
app.use('/users', newMaterial);
app.use(cookieParser()); 


mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on('error', err => {
  console.error('Error connecting to MongoDB:', err);
});
