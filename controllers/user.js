const db = require("../models");

exports.addUser = async (req, res, next) => {
  try {
    let data;
    if (Array.isArray(req.body)) {
      data = await db.User.bulkCreate(req.body);
    } else {
      data = await db.User.create({
        name: req.body.name,
        email: req.body.email,
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "User added successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const data = await db.User.findAll({
      include: [db.Order],
    });
    res.status(200).json({
      statusCode: 200,
      message: "Users fetched successfully",
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
