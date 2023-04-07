const express = require("express");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

const productRoutes = require("./routes/product");
app.use("/api/product", productRoutes);

const orderRoutes = require("./routes/order");
app.use("/api/order", orderRoutes);

const orderDetailsRoutes = require("./routes/orderDetails");
app.use("/api/orderDetails", orderDetailsRoutes);

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`!!!App listening at: http://localhost:${PORT}!!!`);
  });
});
