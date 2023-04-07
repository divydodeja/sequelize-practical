module.exports = (sequelize, Datatypes) => {
  const orderDetail = sequelize.define("orderDetail", {
    quantity: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
  });
  return orderDetail;
};
