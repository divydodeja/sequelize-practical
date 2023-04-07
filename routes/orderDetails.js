const express = require("express");
const router = express.Router();

const orderDetailsController = require("../controllers/orderDetails");

router.post("/add", orderDetailsController.addOrderDetails);
router.get("/view", orderDetailsController.getOrderDetails);

module.exports = router;
