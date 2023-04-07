const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");

router.post("/add", orderController.addOrder);
router.get("/view", orderController.getOrders);

module.exports = router;
