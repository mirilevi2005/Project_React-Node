const mongoose = require('mongoose')

const LectureSchema=new mongoose.Schema({
    Id:Number,
    nameLecture:String,
    emil:String,
})

module.exports=mongoose.model('leactures',LectureSchema)