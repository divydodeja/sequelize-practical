const db = require("../models");

exports.addProduct = async (req, res, next) => {
  try {
    let data;
    if (Array.isArray(req.body)) {
      data = await db.Product.bulkCreate(req.body);
    } else {
      data = await db.Product.create({
        name: req.body.name,
        price: req.body.price,
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Product added successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const data = await db.Product.findAll({
      //   include: [db.Post],
    });
    res.status(200).json({
      statusCode: 200,
      message: "Products fetched successfully",
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
