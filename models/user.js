module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define("User", {
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
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Order);
  };
  return User;
};
