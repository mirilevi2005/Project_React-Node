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
    res.json({ accessToken, user: userInfo })
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

// התחברות עם Google
const googleLogin = async (req, res) => {
    const { email, userName } = req.body;

    if (!email || !userName) {
        return res.status(400).json({ message: "Missing email or userName" });
    }

    try {
        let user = await User.findOne({ email }).lean();

        // אם לא קיים, צור משתמש חדש
        if (!user) {
            const newUser = await User.create({
                userName,
                email,
                roles: 'student', // ברירת מחדל
            });

            user = newUser.toObject(); // כדי להחזיר אותו אח"כ
        }

        const userInfo = {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            roles: user.roles,
        };

        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        return res.json({ accessToken, user: userInfo });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports = { signIn, signUp ,googleLogin}
