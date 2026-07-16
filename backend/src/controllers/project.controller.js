import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../services/project.service.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await getProjects(req.query);

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleProject = async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addProject = async (req, res) => {
  try {
    const project = await createProject(req.body);

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const editProject = async (req, res) => {
  try {
    const project = await updateProject(req.params.id, req.body);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const removeProject = async (req, res) => {
  try {
    const deleted = await deleteProject(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
