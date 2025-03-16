const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5174", // ודא שזה כתובת הפרונט שלך
    methods: ["GET", "POST"],
  },
});

// התחברות ל-MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/chatDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// יצירת מודל להודעות
const MessageSchema = new mongoose.Schema({
  sender: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", MessageSchema);

app.use(cors());
app.use(express.json());

// קבלת כל ההודעות מהשרת
app.get("/messages", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

io.on("connection", (socket) => {
  console.log("🔌 משתמש התחבר");

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`🚪 משתמש הצטרף לחדר ${room}`);
  });

  // קבלת הודעה מהלקוח ושמירה בבסיס הנתונים
  socket.on("send_message", async (data) => {
    const { room, sender, message } = data;
    const newMessage = new Message({ sender, message });
    await newMessage.save();

    io.to(room).emit("receive_message", newMessage); // שולח לכל המשתמשים בחדר
  });

  socket.on("disconnect", () => {
    console.log("🚫 משתמש התנתק");
  });
});

server.listen(5001, () => {
  console.log("🚀 השרת רץ על פורט 5001");
});
