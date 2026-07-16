import { useEffect, useState } from "react";

import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projectApi";

function useProjects() {
  const [projects, setProjects] = useState([]);

  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const showNotification = (message, type = "success") => {
    setNotification({
      message,
      type,
    });

    setTimeout(() => {
      setNotification({
        message: "",
        type: "",
      });
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
      showNotification(
        error.response?.data?.message || "Unable to connect to the server.",
        "error",
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

        showNotification("Project updated successfully.", "success");
      } else {
        await createProject(data);

        showNotification("Project created successfully.", "success");
      }

      setIsModalOpen(false);

      setSelectedProject(null);

      loadProjects();
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Unable to connect to the server.",
        "error",
      );
    }
  };

  const handleDeleteRequest = (id) => {
    setDeleteId(id);

    setDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteProject(deleteId);

      showNotification("Project deleted successfully.", "success");

      setDeleteModal(false);

      setDeleteId(null);

      loadProjects();
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Unable to connect to the server.",
        "error",
      );
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

    notification,
  };
}

export default useProjects;
