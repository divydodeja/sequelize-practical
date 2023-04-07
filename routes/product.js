const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

router.post("/add", productController.addProduct);
router.get("/view", productController.getProducts);

module.exports = router;
