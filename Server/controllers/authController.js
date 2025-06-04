const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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
    previousLogin = foundUser.lastLogin || new Date(0);
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
  if (!userName || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const foundUser = await User.findOne({ userName }).lean();
  if (foundUser) {
    return res.status(409).json({ message: "Duplicate username" });
  }
  const foundUserEmail = await User.findOne({ email }).lean();
  if (foundUserEmail) {
    return res.status(409).json({ message: "Duplicate email" });
  }
  const hashedPwd = await bcrypt.hash(password, 10);
  const role = adminCode === process.env.TEACHER_SECRET ? "lecturer" : "student";
  const newUser = await User.create({
    userName,
    email,
    password: hashedPwd,
    roles: role,
  });
  if (!newUser) {
    return res.status(400).json({ message: "Invalid user received" });
  }
  const accessToken = jwt.sign(
    {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      roles: newUser.roles,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  res.status(201).json({
    accessToken,
    newUser: {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      roles: newUser.roles,
    },
  });
};

const googleLogin = async (req, res) => {
  const { email, userName } = req.body;

  if (!email || !userName) {
    return res.status(400).json({ message: "Missing email or userName" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    let previousLogin = null;
    if (user.roles === "student") {
      previousLogin = user.lastLogin || new Date(0);
      user.lastLogin = new Date();
      await user.save();
    }

    const userInfo = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      roles: user.roles,
    };

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);

    return res.json({
      accessToken,
      newUser: userInfo,
      previousLogin: userInfo.roles === "student" ? previousLogin : null,
    });
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

    const tempPassword = crypto.randomBytes(4).toString("hex"); 
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

    user.password = hashedTempPassword; 
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

const sendMagicLinkEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
     const token = user.password;
    if (!token) {
      return res.status(404).json({ message: "Token not found for user" });
    }
    const role = user.roles; 
    let link = `${process.env.CLIENT_URL}/login?token=${token}`;
    let greetingName = user.name || "משתמש";
    switch (role) {
      case "lecturer":
        link = `${process.env.CLIENT_URL}/HomeLecturer`;
        break;
      case "student":
        link = `${process.env.CLIENT_URL}/HomeStudent`;
        break;
      default:
        link = `${process.env.CLIENT_URL}/Home`;
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `EduThec <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "קישור התחברות למערכת",
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1976d2;">שלום ${greetingName},</h2>
          <p>קיבלת קישור להתחברות למערכת שלנו. לחיצה על הכפתור תאפשר לך גישה מהירה ובטוחה:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${link}" style="background-color: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;" target="_blank">
              התחבר למערכת
            </a>
          </div>
          <p>אם לא ביקשת קישור זה, תוכל להתעלם מההודעה הזו.</p>
          <p style="font-size: 14px; color: #999;">בברכה,<br>צוות התמיכה שלנו</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);

  res.json({
  message: "Magic link sent",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.roles,
  }
});

  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
    res.status(500).json({ message: "Failed to send magic link" });
  }
};

module.exports = {
  signIn,
  signUp,
  googleLogin,
  forgotPassword,
  changePassword,
  verifyTempPassword,
  sendMagicLinkEmail
};
