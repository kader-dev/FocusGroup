const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const pollScheama = new mongoose.Schema({
  question: {
    type: String,
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  room: {
    type: String,
  },
});

module.exports = mongoose.model("Poll", pollScheama);
