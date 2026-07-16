import { useEffect, useState } from "react";

import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projectApi";

function useProjects() {
  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const showError = (message) => {
    setError(message);

    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const loadProjects = async () => {
    try {
      setLoading(true);

      const data = await fetchProjects({
        search,
        status,
      });

      setProjects(data);
    } catch (error) {
      showError(
        error.response?.data?.message || "Unable to connect to server.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [search, status]);

  const handleCreate = () => {
    setSelectedProject(null);

    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);

    setIsModalOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedProject) {
        await updateProject(selectedProject.id, data);
      } else {
        await createProject(data);
      }

      setIsModalOpen(false);

      setSelectedProject(null);

      loadProjects();
    } catch (error) {
      showError(error.response?.data?.message || "Unable to save project.");
    }
  };

  const handleDeleteRequest = (id) => {
    setDeleteId(id);

    setDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteProject(deleteId);

      setDeleteModal(false);

      setDeleteId(null);

      loadProjects();
    } catch (error) {
      showError(error.response?.data?.message || "Unable to delete project.");
    }
  };

  return {
    projects,

    loading,

    error,

    search,

    setSearch,

    status,

    setStatus,

    handleCreate,

    handleEdit,

    handleSubmit,

    handleDeleteRequest,

    handleDelete,

    isModalOpen,

    setIsModalOpen,

    selectedProject,

    deleteModal,

    setDeleteModal,
  };
}

export default useProjects;
