const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// --------------------------deployment------------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // Ensure default port is used if not provided in the environment variable

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`.yellow.bold);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000", // Client-side URL (make sure it's accurate)
    // credentials: true, // If using cookies or session-based authentication
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  // Setup the socket for the connected user
  socket.on("setup", (userData) => {
    socket.join(userData._id); // Join a room for the user
    socket.emit("connected"); // Emit a 'connected' event to confirm the connection
  });

  // Handle when a user joins a specific chat room
  socket.on("join chat", (room) => {
    socket.join(room); // Join the chat room (group or direct chat)
    console.log("User Joined Room: " + room);
  });

  // Emit typing indicator to the room
  socket.on("typing", (room) => {
    socket.in(room).emit("typing"); // Notify other users in the room that someone is typing
  });

  // Stop typing indicator
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing"); // Stop the typing notification
  });

  // Handle incoming messages and broadcast them to the respective users
  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      // Emit the message to all users except the sender
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  // When the user disconnects, leave their room and clean up
  socket.on("disconnect", () => {
    console.log("User disconnected");
    // Perform any cleanup operations if necessary (e.g., leaving rooms)
  });

  // Ensure cleanup when the setup event is off
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id); // Ensure user leaves the room when disconnected
  });
});
