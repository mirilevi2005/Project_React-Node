// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:5001");

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     socket.emit("join_room", "chat_room");

//     axios.get("http://localhost:5000/messages").then((res) => {
//       setMessages(res.data);
//     });

//     socket.on("receive_message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit("send_message", {
//         room: "chat_room",
//         sender: "Lecturer",
//         message,
//       });
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <h2>🎓 צ'אט מרצה</h2>
//       <div>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.sender}:</strong> {msg.message}
//           </p>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>שלח</button>
//     </div>
//   );
// };

// export default Chat;
