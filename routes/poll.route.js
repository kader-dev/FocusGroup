const express = require("express");
const router = express.Router();

// import controller
const { requireSignin } = require("../controllers/auth.controller");
const {
  readController,
  createController,
  getAllController,
} = require("../controllers/poll.controller");
router.get("/poll/all", getAllController);
router.get("/poll/:id", requireSignin, readController);
router.post("/poll/create", createController);

module.exports = router;
