import express from "express";

import {
  getAllProjects,
  getSingleProject,
  addProject,
  editProject,
  removeProject,
} from "../controllers/project.controller.js";

const projectRoutes = express.Router();

projectRoutes.get("/", getAllProjects);

projectRoutes.get("/:id", getSingleProject);

projectRoutes.post("/", addProject);

projectRoutes.put("/:id", editProject);

projectRoutes.delete("/:id", removeProject);

export default projectRoutes;
