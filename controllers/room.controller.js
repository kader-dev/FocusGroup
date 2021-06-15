const Room = require("../models/room.model");

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
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const room = new Room({
    name: req.body.name,
    description: req.body.description,
    duration: req.body.duration ? req.body.duration : "00",
    participants: req.body.participants,
    client: req.body.client,
    startDate: req.body.startDate,
    state: req.body.state,
    link: req.body.link,
  });

  room
    .save(room)
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
