const db = require("../models");

exports.addOrder = async (req, res, next) => {
  try {
    let data;
    if (Array.isArray(req.body)) {
      data = await db.Order.bulkCreate(req.body);
    } else {
      data = await db.Order.create({
        UserId: req.body.UserId,
        orderStatus: req.body.orderStatus,
        deliveryDate: req.body.deliveryDate,
        orderDate: req.body.orderDate,
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Order added successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const data = await db.Order.findAll({
      include: [
        db.User,
        {
          model: db.Product,
        },
      ],
    });
    res.status(200).json({
      statusCode: 200,
      message: "Orders fetched successfully",
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
