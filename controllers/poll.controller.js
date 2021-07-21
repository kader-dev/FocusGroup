const Poll = require("../models/poll.model");
const Answer = require("../models/answer.model");

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

exports.getAllController = (req, res) => {
  Room.find({}, function (err, users) {
    res.json(users);
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
