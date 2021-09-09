const Recording = require("../models/recording.model");

exports.readController = (req, res) => {
  const userId = req.params.id;
};

exports.getRecsByClient = (req, res) => {
  const room = req.params.room;
  console.log(room);
  Recording.find({ room: room }).exec((err, recs) => {
    if (err || !recs) {
      return res.status(400).json({
        error: "recordings not found",
      });
    }
    res.json(recs);
  });
};

exports.getAllController = (req, res) => {
  Recording.find({}, function (err, recs) {
    res.json(recs);
  });
};

exports.createController = (req, res) => {
  if (!req.body.link) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const recording = new Recording({
    link: req.body.link,
    date: req.body.date,
    room: req.body.room,
    roomName: req.body.roomName,
  });

  recording
    .save(recording)
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
