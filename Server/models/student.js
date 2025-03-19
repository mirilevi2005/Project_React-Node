
const mongoose=require('mongoose')
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        lowercase:true,
        required:true,
        index:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true
    },
    roles:{
        type:String, 
        enum:['lacturer','student'],
        default:'student'
    },
    marks:{
        type:[{"_id":mongoose.Schema.Types.ObjectId,"mark":Number}]
    },})
    module.exports=mongoose.model('student',studentSchema)