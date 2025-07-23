const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./models/db");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/resources", require("./routes/resources"));
app.use("/api/recruiters", require("./routes/recruiters"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api", require("./routes/api"));

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("joinRoom", (room) => {
    socket.join(room);
    socket.to(room).emit("userJoined", socket.id);
  });
  socket.on("sendMessage", ({ room, message, user }) => {
    io.to(room).emit("receiveMessage", { message, user, time: new Date() });
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

connectDB()
  .then(() => server.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));