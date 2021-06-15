const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const { render } = require("ejs");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
app.use("/peerjs", peerServer);
const { v4: uuidV4 } = require("uuid");
// Config dotev
require("dotenv").config({
  path: "./config/config.env",
});

//---------- videoChat setup start ---------
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});
app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
  });
});
//---------- videoChat setup end -----------
// Connect to database
connectDB();

// body parser
app.use(bodyParser.json());
// Load routes
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const roomRouter = require("./routes/room.route");

// Dev Logginf Middleware
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  app.use(morgan("dev"));
}

// Use Routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", roomRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: "Page not founded",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
