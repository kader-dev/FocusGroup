const mongoose = require("mongoose");

const roomScheama = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  participants: {
    type: [String],
  },
  duration: {
    type: String,
  },
  admin: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  client: {
    type: String,
  },
  link: {
    type: String,
  },
  state: {
    type: String,
  },
});

module.exports = mongoose.model("Room", roomScheama);
