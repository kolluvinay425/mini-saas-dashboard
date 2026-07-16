import { Op } from "sequelize";
import Project from "../models/project.model.js";

export const getProjects = async ({ status, search }) => {
  const where = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.name = {
      [Op.iLike]: `%${search}%`,
    };
  }

  return await Project.findAll({
    where,
    order: [["createdAt", "DESC"]],
  });
};

export const getProjectById = async (id) => {
  return await Project.findByPk(id);
};

export const createProject = async (data) => {
  return await Project.create(data);
};

export const updateProject = async (id, data) => {
  const project = await Project.findByPk(id);

  if (!project) {
    return null;
  }

  return await project.update(data);
};

export const deleteProject = async (id) => {
  const project = await Project.findByPk(id);

  if (!project) {
    return null;
  }

  await project.destroy();

  return true;
};
