const db = require("../models");

exports.addOrderDetails = async (req, res, next) => {
  try {
    let data;
    if (Array.isArray(req.body)) {
      data = await db.orderDetail.bulkCreate(req.body);
    } else {
      data = await db.orderDetail.create({
        OrderId: req.body.OrderId,
        ProductId: req.body.ProductId,
        quantity: req.body.quantity,
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Order Details added successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
};

exports.getOrderDetails = async (req, res, next) => {
  try {
    const data = await db.orderDetail.findAll({});
    res.status(200).json({
      statusCode: 200,
      message: "Orders Details fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
};
