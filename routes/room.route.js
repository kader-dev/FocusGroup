const express = require("express");
const router = express.Router();

// import controller
const { requireSignin } = require("../controllers/auth.controller");
const {
  readController,
  createController,
  getAllController,
  testController,
} = require("../controllers/room.controller");
router.get("/room/het", testController);
router.get("/room/all", getAllController);
router.get("/room/:id", requireSignin, readController);

router.post("/room/create", createController);

module.exports = router;
