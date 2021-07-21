const mongoose = require("mongoose");

const pollScheama = new mongoose.Schema({
  question: {
    type: String,
  },
  answers: {
    type: [],
  },
  room: {
    type: String,
  },
});

module.exports = mongoose.model("Poll", pollScheama);
