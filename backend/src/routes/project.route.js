import express from "express";

import {
  getAllProjects,
  getSingleProject,
  addProject,
  editProject,
  removeProject,
} from "../controllers/project.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const projectRoutes = express.Router();

projectRoutes.get("/", authMiddleware, getAllProjects);

projectRoutes.get("/:id", authMiddleware, getSingleProject);

projectRoutes.post("/", authMiddleware, addProject);

projectRoutes.put("/:id", authMiddleware, editProject);

projectRoutes.delete("/:id", authMiddleware, removeProject);

export default projectRoutes;
