// const UserLecturers = require("../models/lecturers")
// const UserStudent = require("../models/student")

// const bcrypt= require('bcrypt')
// const jwt= require('jsonwebtoken')


// const singInLecturers = async (req,res)=>{
// const {email, password} = req.body  
//  if (!email||!password)
//         return res.status(400).json({message: "please fill all the required parameters"})
//     const foundUserLecturers=await UserLecturers.findOne({email}).lean()
//     if (!foundUserLecturers)
//         return res.status(401).json({message: "UnauthOrilized"})
//     const match=await bcrypt.compare(password, foundUserLecturers.password)
//     if (!match)
//         return res.status(401).json({message: "UnauthOrilized"})
//     const UserLecturersInfo=
//     {_id: foundUserLecturers._id,
//     userName: foundUserLecturers.userName,
//     email: foundUserLecturers.email,
//     roles: foundUserLecturers.roles,
//     nameCours: foundUserLecturers.nameCours,
//     marksOfStudent: foundUserLecturers.marksOfStudent}
//     const accessToken=jwt.sign(UserLecturersInfo,process.env.ACCESS_TOKEN_SECRET)
//     res.cookie('token', accessToken, {
//         httpOnly: true,       // מונע גישה ל-JS בצד לקוח
//         secure: true,         // דורש HTTPS (בפיתוח אפשר להוריד)
//         sameSite: 'Strict',   // מונע שליחה מדומיינים אחרים
//         path: '/',            // רלוונטי לכל האתר
//         maxAge: 24 * 60 * 60 * 1000, // תוקף של יום
//       });
//     res.json({accessToken:accessToken, UserLecturers:UserLecturersInfo})
//  }


// //הרשמה מרצה
//  const singUpLecturers = async (req,res)=>{
//     const {userName,email, password}=req.body///לשאול על הid
//     if (!userName||!password||!email) 
//        return res.status(400).json({ message: 'All fields are required'})
//     const foundUserLecturers = await UserLecturers.findOne({userName:userName}).lean()
//     if (foundUserLecturers) {
//         return res.status(409).json({message:"Duplicate username"})    }
//     const hashedPwd = await bcrypt.hash(password, 10)
//     const userLecturersObject= {userName,email,password:hashedPwd}
//     const newLecturer = await UserLecturers.create(userLecturersObject)
//      if (newLecturer) { // Created
//          return res.status(201).json({message:`New user ${newLecturer.userName} created` })
//      } else {
//     return res.status(400).json({message:'Invalid userLacturer received'})
//     }
// }









// ///התחברות תלמיד
// const singInStudent = async (req,res)=>{ 
//     const {email, password} = req.body  
//     if (!email||!password)
//            return res.status(400).json({message: "please fill all the required parameters"})
//        const foundUserStudent=await UserStudent.findOne({email}).lean()
//        if (!foundUserStudent)
//            return res.status(401).json({message: "UnauthOrilized"})
//        const match=await bcrypt.compare(password, foundUserStudent.password)
//        if (!match)
//            return res.status(401).json({message: "UnauthOrilized"})
//        const UserStudentInfo=
//        {_id: foundUserStudent._id,
//        userName: foundUserStudent.userName,
//        email: foundUserStudent.email,
//        roles: foundUserStudent.roles,
//        nameCours: foundUserStudent.nameCours,
//        marksOfStudent: foundUserStudent.marksOfStudent}
//        const accessToken=jwt.sign(UserStudentInfo,process.env.ACCESS_TOKEN_SECRET)
//        res.cookie('token', accessToken, {
//            httpOnly: true,       // מונע גישה ל-JS בצד לקוח
//            secure: true,         // דורש HTTPS (בפיתוח אפשר להוריד)
//            sameSite: 'Strict',   // מונע שליחה מדומיינים אחרים
//            path: '/',            // רלוונטי לכל האתר
//            maxAge: 24 * 60 * 60 * 1000, // תוקף של יום
//          });
//        res.json({accessToken:accessToken, UserStudent:UserStudentInfo})
// }





// ///הרשמה תלמיד
// const singUpStudent = async (req,res)=>{
//     const {userName,email,_id, password}=req.body///לשאול על הid
//     if (!userName||!password||!email) 
//        return res.status(400).json({ message: 'All fields are required'})
//     const foundUserStudent = await UserStudent.findOne({userName:userName}).lean()
//     if (foundUserStudent) {
//         return res.status(409).json({message:"Duplicate username"})    }
//     const hashedPwd = await bcrypt.hash(password, 10)
//     const userStudentObject= {userName,email,password:hashedPwd}
//     const newStudent = await UserLecturers.create(userStudentObject)
//      if (newStudent) { // Created
//          return res.status(201).json({message:`New user ${newStudent.userName} created` })
//      } else {
//     return res.status(400).json({message:'Invalid userStudent received'})
//     }
// }

// module.exports = {singInLecturers,singUpLecturers,singInStudent,singUpStudent}