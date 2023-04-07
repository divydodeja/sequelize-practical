module.exports = (sequelize, Datatypes) => {
  const Order = sequelize.define("Order", {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderStatus: {
      type: Datatypes.ENUM("confirmed", "pending", "shipped", "delivered"),
      allowNull: false,
      validate: {
        isAlpha: true,
      },
      defaultValue: "pending",
    },
    orderDate: {
      type: Datatypes.DATE,
      defaultValue: sequelize.fn("NOW"),
    },
    deliveryDate: {
      type: Datatypes.DATE,
      allowNull: false,
    },
  });
  Order.associate = (models) => {
    Order.belongsTo(models.User);
    Order.belongsToMany(models.Product, { through: models.orderDetail });
  };
  return Order;
};
