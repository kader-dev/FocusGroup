const express = require("express");
const router = express.Router();

// import controller
const { requireSignin } = require("../controllers/auth.controller");
const {
  readController,
  createController,
  getAllController,
  getRecsByClient,
} = require("../controllers/recording.controller");
router.get("/rec/all", getAllController);
router.get("/rec/:id", requireSignin, readController);
router.post("/rec/create", createController);
router.get("/rec/room/:room", getRecsByClient);

module.exports = router;
