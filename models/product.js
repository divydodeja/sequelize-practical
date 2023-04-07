module.exports = (sequelize, Datatypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    price: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });
  Product.associate = (models) => {
    Product.belongsToMany(models.Order, { through: models.orderDetail });
  };
  return Product;
};
