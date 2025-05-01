const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// התחברות
const signIn = async (req, res) => { 
    const { email, password } = req.body  
    if (!email || !password)
        return res.status(400).json({ message: "Please fill all the required parameters" })
    const foundUser = await User.findOne({ email }).lean()
    if (!foundUser)
        return res.status(401).json({ message: "Unauthorized123" })
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).json({ message: "Unauthorized123" })
    const userInfo = {
        _id: foundUser._id,
        userName: foundUser.userName,
        email: foundUser.email,
        roles: foundUser.roles,
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    // res.cookie('token', accessToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== 'development', 
    //     sameSite: 'Strict',
    //     path: '/',
    //     maxAge: 24 * 60 * 60 * 1000, // יום אחד//יותר נכון לעשות שהמשתמש יוצא מהמערכת אז נגמר הזמן שנשמר בcookies
    // });
    res.json({ accessToken, userInfo })
}

//הרשמה
const signUp = async (req, res) => {
    const { userName, email, password, adminCode  } = req.body;
    if (!userName || !password || !email) 
        return res.status(400).json({ message: 'All fields are required' });
    const foundUser = await User.findOne({ userName }).lean();
    if (foundUser) {
        return res.status(409).json({ message: "Duplicate username" });
    }
    const foundUserEmail = await User.findOne({ email }).lean();
    if (foundUserEmail) {
        return res.status(409).json({ message: "Duplicate email" });
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    // קביעת תפקיד לפי קוד מורה
    const role = (adminCode  === process.env.TEACHER_SECRET) ? 'lacturer' : 'student';
    const userObject = {
        userName,
        email,
        password: hashedPwd,
        roles: role,
    };
    const newUser = await User.create(userObject);
    if (newUser) {
        return res.status(201).json({ message: `New user ${newUser.userName} created as ${role}` ,newUser});
    } else {
        return res.status(400).json({ message: 'Invalid user received' });
    }
};

module.exports = { signIn, signUp }
