require("dotenv").config();
const express = require("express");
const db = require("./config/database");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, { serveClient: false });
io.on("connection", (socket) => {
  const { room } = socket.handshake.query;

  if (room) {
    socket.join(room, (err) => {
      if (err) return console.log(err);
      console.log(`User connected to room ${room}`);
    });
  }

  socket.on("new_message", (r) => {
    console.log("a user submitted a message");
    io.to(r).emit("new_message");
  });

  socket.on("rooms_changed", () => {
    console.log("a user created/deleted a room");
    io.emit("rooms_changed");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(5001, () => {
  console.log("listening on port 5001");
});

app.use(express.json());

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/rooms", require("./routes/api/rooms"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
