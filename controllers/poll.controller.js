const Poll = require("../models/poll.model");
const Answer = require("../models/answer.model");
const mongoose = require("mongoose");

exports.readController = (req, res) => {
  const userId = req.params.id;
  Room.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

var aa = [];
var ss = [];

exports.getVotesByRoom = (req, res) => {
  const room = req.params.room;

  Poll.find({ room: room })
    .populate("answers")
    .exec((err, votes) => {
      if (err || !votes) {
        return res.status(400).json({
          error: "votes not found",
        });
      }

      res.json(votes);
    });
};

exports.getAnswersByVote = (id) => {
  Answer.findOne({ _id: id }).exec((err, ans) => {
    if (err || !ans) {
      return res.status(400).json({
        error: _id,
      });
    }
  });
};

exports.getAllController = (req, res) => {
  Poll.find({})
    .populate("answers")
    .exec((err, votes) => {
      if (err || !votes) {
        return res.status(400).json({
          error: "votes not found",
        });
      }

      res.json(votes);
    });
};

exports.createController = (req, res) => {
  if (!req.body.question) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  let answersTab = [];

  req.body.answers.forEach((element) => {
    const answer = new Answer({
      option: element.option,
      votes: element.votes,
    });
    answer
      .save(answer)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      });
    answersTab.push(answer._id);
  });

  const poll = new Poll({
    question: req.body.question,
    answers: answersTab,
    room: req.body.room,
  });
  console.log(poll);

  poll
    .save(poll)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};
