import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "ON_HOLD", "COMPLETED"),
      allowNull: false,
    },

    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    assignedTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    budget: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "projects",
  },
);

export default Project;
