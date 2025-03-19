const express=require('express');
const mongoose=require('mongoose');
const cors=require("cors")

const app=express();
connectDB();
app.use(express.json());


const corsOptions=require("./config/corsOptions")
const connectDB=require('./config/dbConn')

const PORT=process.env.PORT||5000

const LearningMaterials=require('./router/LearningMaterialsRouter');
const Lecturer=require('./router/LearningMaterialsRouter');
const Student=require('./router/LearningMaterialsRouter');

app.use(cors(corsOptions))
app.use('/NameOfLeucte/nameMatiral',LearningMaterials);
app.use('/NameOfLeucte',Lecturer);
app.use('/NameOfStudent',Student);

app.listen(PORT,()=>{
    console.log(`server is runing on port ${PORT}`); 
})


mongoose.connection.once('open',()=>{
    console.log('Connected')
    app.listen(PORT,()=>{
    console.log(`Server running in port ${PORT}`)
})
})
mongoose.connection.on('error',err=>{
    console.log(err)
})


