const express=require('express');
const app=express();
app.use(express.json());

const PORT=process.env.PORT||5000

const LearningMaterials=require('./router/LearningMaterialsRouter');
const Lecturer=require('./router/LearningMaterialsRouter');
const Student=require('./router/LearningMaterialsRouter');


app.use('/NameOfLeucte/nameMatiral',LearningMaterials);
app.use('/NameOfLeucte',Lecturer);
app.use('/NameOfStudent',Student);

app.listen(PORT,()=>{
    console.log(`server is runing on port ${PORT}`);
    
})
