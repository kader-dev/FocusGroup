const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const { render } = require("ejs");
const app = express();
const socket = require("socket.io");
const server = require("http").Server(app);
const { ExpressPeerServer } = require("peer");

const groupCallHandler = require("./groupCallHandler");
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
let peers = [];
let groupCallRooms = [];

const broadcastEventTypes = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};
groupCallHandler.createPeerServerListeners(peerServer);
const io = socket(server, {
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("poll", ({ question, votes, progress }) => {
    io.emit("poll", { question, votes, progress });
  });
  socket.on("vote", ({ question, voteAnswer }) => {
    io.emit("vote", { question, voteAnswer });
  });

  socket.on("hand", ({ name }) => {
    io.emit("hand", { name });
  });

  socket.emit("connection", null);
  console.log("new user connected");
  console.log(socket.id);

  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    console.log(roomId);
    socket.to(roomId).emit("user-connected", userId);
    // messages
    socket.on("message", (message) => {
      //send message to the same room
      io.to(roomId).emit("createMessage", message);
    });

    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId);
    });
  });
  socket.on("register-new-user", (data) => {
    peers.push({
      username: data.username,
      socketId: data.socketId,
    });
    console.log("registered new user");
    console.log(peers);

    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    });

    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    peers = peers.filter((peer) => peer.socketId !== socket.id);
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    });

    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });

  // listeners related with direct call

  socket.on("pre-offer", (data) => {
    console.log("pre-offer handled");
    io.to(data.callee.socketId).emit("pre-offer", {
      callerUsername: data.caller.username,
      callerSocketId: socket.id,
    });
  });

  socket.on("pre-offer-answer", (data) => {
    console.log("handling pre offer answer");
    io.to(data.callerSocketId).emit("pre-offer-answer", {
      answer: data.answer,
    });
  });

  socket.on("webRTC-offer", (data) => {
    console.log("handling webRTC offer");
    io.to(data.calleeSocketId).emit("webRTC-offer", {
      offer: data.offer,
    });
  });

  socket.on("webRTC-answer", (data) => {
    console.log("handling webRTC answer");
    io.to(data.callerSocketId).emit("webRTC-answer", {
      answer: data.answer,
    });
  });

  socket.on("webRTC-candidate", (data) => {
    console.log("handling ice candidate");
    io.to(data.connectedUserSocketId).emit("webRTC-candidate", {
      candidate: data.candidate,
    });
  });

  socket.on("user-hanged-up", (data) => {
    io.to(data.connectedUserSocketId).emit("user-hanged-up");
  });

  // listeners related with group call
  socket.on("group-call-register", (data) => {
    const roomId = uuidV4();
    socket.join(roomId);

    const newGroupCallRoom = {
      peerId: data.peerId,
      hostName: data.username,
      socketId: socket.id,
      roomId: roomId,
    };

    groupCallRooms.push(newGroupCallRoom);
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });

  socket.on("group-call-join-request", (data) => {
    io.to(data.roomId).emit("group-call-join-request", {
      peerId: data.peerId,
      streamId: data.streamId,
    });

    socket.join(data.roomId);
  });

  socket.on("group-call-user-left", (data) => {
    socket.leave(data.roomId);

    io.to(data.roomId).emit("group-call-user-left", {
      streamId: data.streamId,
    });
  });

  socket.on("group-call-closed-by-host", (data) => {
    groupCallRooms = groupCallRooms.filter(
      (room) => room.peerId !== data.peerId
    );

    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
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
const pollRouter = require("./routes/poll.route");
const recordingRouter = require("./routes/recording.route");

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
app.use("/api", pollRouter);
app.use("/api", recordingRouter);

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
