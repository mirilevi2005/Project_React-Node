const mongoose = require('mongoose')

const studentSchema=new mongoose.Schema({
    Id:Number,
    nameStudent:String,
    emil:String,
    

})

module.exports=mongoose.model('student',studentSchema)