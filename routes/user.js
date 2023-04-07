const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.post("/add", userController.addUser);
router.get("/view", userController.getUsers);

module.exports = router;
