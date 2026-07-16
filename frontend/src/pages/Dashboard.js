import { useEffect, useState } from "react";

import ProjectTable from "../components/ProjectTable";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import ProjectModal from "../components/ProjectModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import StatsCard from "../components/StatsCard";

import { FiFolder, FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projectApi";

function Dashboard() {
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
      console.error(error);
      showError(
        error.response?.data?.message || "Unable to connect to the server.",
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

      await loadProjects();
    } catch (error) {
      console.error(error);

      showError(
        error.response?.data?.message || "Unable to connect to the server.",
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

      setDeleteModal(false);
      setDeleteId(null);

      await loadProjects();
    } catch (error) {
      console.error(error);

      showError(
        error.response?.data?.message || "Unable to connect to the server.",
      );
    }
  };

  return (
    <div
      className="
            min-h-screen
            bg-gray-100
            p-8
        "
    >
      {error && (
        <div
          className="
            fixed
            top-6
            right-6
            z-50
            max-w-sm
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-red-700
            shadow-lg
            transition-all
            duration-300
            "
        >
          {error}
        </div>
      )}
      <h1
        className="
                text-3xl
                font-bold
                mb-8
            "
      >
        Mini SaaS Dashboard
      </h1>
      {/* {loading && <p className="text-gray-600 mb-4">Deleting project...</p>} */}
      <div
        className="
                flex
                flex-col
                md:flex-row
                gap-4
                mb-6
            "
      >
        <SearchBar search={search} setSearch={setSearch} />

        <StatusFilter status={status} setStatus={setStatus} />
      </div>

      <button
        onClick={handleCreate}
        className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
        mb-6
    "
      >
        + Add Project
      </button>
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
        mb-8
    "
      >
        <StatsCard
          title="Total Projects"
          value={projects.length}
          icon={<FiFolder />}
        />

        <StatsCard
          title="Active"
          value={projects.filter((p) => p.status === "ACTIVE").length}
          icon={<FiCheckCircle />}
        />

        <StatsCard
          title="On Hold"
          value={projects.filter((p) => p.status === "ON_HOLD").length}
          icon={<FiClock />}
        />

        <StatsCard
          title="Total Budget"
          value={`€${projects
            .reduce((sum, p) => sum + Number(p.budget), 0)
            .toLocaleString()}`}
          icon={<FiDollarSign />}
        />
      </div>
      <ProjectTable
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
      />
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedProject={selectedProject}
      />

      {loading && (
        <div
          className="
          text-red-1200
          mb-4
        "
        >
          Loading projects...
        </div>
      )}
      <ConfirmDeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default Dashboard;
