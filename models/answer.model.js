const mongoose = require("mongoose");

const answerScheama = new mongoose.Schema({
  option: {
    type: String,
  },
  votes: {
    type: Number,
  },
});

module.exports = mongoose.model("Answer", answerScheama);
