const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
// התחברות
// const signIn = async (req, res) => {
//     const { email, password } = req.body
//     console.log(email        ,     password );

//     if (!email || !password)
//         return res.status(400).json({ message: "Please fill all the required parameters" })
//     const foundUser = await User.findOne({ email }).lean()
//     if (!foundUser)
//         return res.status(401).json({ message: "Unauthorized123" })
//     const match = await bcrypt.compare(password, foundUser.password)
//     if (!match)
//         return res.status(401).json({ message: "Unauthorized123" })
//     const userInfo = {
//         _id: foundUser._id,
//         userName: foundUser.userName,
//         email: foundUser.email,
//         roles: foundUser.roles,
//     }
//     const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
//     res.json({ accessToken, newUser:userInfo })
// }

const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Please fill all the required parameters" });

  const foundUser = await User.findOne({ email });
  if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Unauthorized" });

  // שמירת זמן התחברות קודם אם סטודנט
  let previousLogin = null;
  if (foundUser.roles === "student") {
    previousLogin = foundUser.lastLogin || new Date(0); // אם אין עדיין ערך
    foundUser.lastLogin = new Date();
    await foundUser.save();
  }

  const userInfo = {
    _id: foundUser._id,
    userName: foundUser.userName,
    email: foundUser.email,
    roles: foundUser.roles,
  };

  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);

  res.json({
    accessToken,
    newUser: userInfo,
    previousLogin: foundUser.roles === "student" ? previousLogin : null,
  });
};

//הרשמה
const signUp = async (req, res) => {
  const { userName, email, password, adminCode } = req.body;
  if (!userName || !password || !email)
    return res.status(400).json({ message: "All fields are required" });
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
  const role =
    adminCode === process.env.TEACHER_SECRET ? "lacturer" : "student";
  const userObject = {
    userName,
    email,
    password: hashedPwd,
    roles: role,
  };
  const newUser = await User.create(userObject);
  if (newUser) {
    return res
      .status(201)
      .json({
        message: `New user ${newUser.userName} created as ${role}`,
        newUser,
      });
  } else {
    return res.status(400).json({ message: "Invalid user received" });
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
        roles: "student", // ברירת מחדל
      });

      user = newUser.toObject(); // כדי להחזיר אותו אח"כ
    }

    const userInfo = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      roles: user.roles,
    };

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ accessToken, newUser: userInfo });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "משתמש לא נמצא" });
    }

    const tempPassword = crypto.randomBytes(4).toString("hex"); // מייצר סיסמה זמנית אקראית
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

    user.password = hashedTempPassword; // מחליף סיסמה קיימת בסיסמה הזמנית החדשה
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "איפוס סיסמה באתר EduThec",
    //   text: `הסיסמה הזמנית שלך היא: ${tempPassword}`,
    // });
    await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "איפוס סיסמה באתר EduThec",
  html: `
    <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>ההזדהות הלאומית</h2>
      <h3>קוד אימות</h3>
      <p style="font-size: 24px; font-weight: bold;">${tempPassword}</p>
      <p>הוא הקוד להמשך תהליך איפוס הסיסמה שלך.</p>
      <p>קוד האימות תקף ל-30 דקות.</p>
      <hr style="margin: 30px 0;" />
      <p>בברכה,<br />צוות ההזדהות הלאומית</p>
    </div>
  `,
});


    res.json({ message: "סיסמה זמנית נשלחה למייל" });
  } catch (err) {
    console.error("שגיאה באיפוס סיסמה:", err);
    res.status(500).json({ error: "שגיאה בשרת" });
  }
};

const verifyTempPassword = async (req, res) => {
  const { email, tempPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "משתמש לא נמצא" });
    }

    const isMatch = await bcrypt.compare(tempPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "סיסמה זמנית שגויה" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      role: user.role,
      email: user.email,
    });
  } catch (err) {
    console.error("שגיאה באימות סיסמה זמנית:", err);
    res.status(500).json({ error: "שגיאה בשרת" });
  }
};

const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "משתמש לא נמצא" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "הסיסמה שונתה בהצלחה" });
  } catch (err) {
    console.error("שגיאה בשינוי סיסמה:", err);
    res.status(500).json({ error: "שגיאה בשרת" });
  }
};
module.exports = {
  signIn,
  signUp,
  googleLogin,
  forgotPassword,
  changePassword,
  verifyTempPassword,
};
