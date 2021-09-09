const mongoose = require("mongoose");

const recordingScheama = new mongoose.Schema({
  link: {
    type: String,
  },
  date: {
    type: String,
  },
  room: {
    type: String,
  },
  roomName: {
    type: String,
  },
});

module.exports = mongoose.model("Recording", recordingScheama);
