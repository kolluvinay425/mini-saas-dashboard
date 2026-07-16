import app from "./app.js";
import sequelize from "./config/database.js";
import listEndpoints from "express-list-endpoints";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync();

    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.table(listEndpoints(app));
    });
  } catch (error) {
    console.error("Database connection failed", error);
  }
};

startServer();
