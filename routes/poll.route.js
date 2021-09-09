const express = require("express");
const router = express.Router();

// import controller
const { requireSignin } = require("../controllers/auth.controller");
const {
  readController,
  createController,
  getAllController,
  getVotesByRoom,
  getAnswersByVote,
} = require("../controllers/poll.controller");
router.get("/poll/all", getAllController);
router.get("/poll/:id", requireSignin, readController);
router.post("/poll/create", createController);
router.get("/poll/find/:room", getVotesByRoom);
router.get("/poll/ans/:id", getAnswersByVote);

module.exports = router;
