import { useEffect, useState } from "react";

import ProjectTable from "../components/ProjectTable";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import ProjectModal from "../components/ProjectModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

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

  const loadProjects = async () => {
    const data = await fetchProjects({
      search,

      status,
    });

    setProjects(data);
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
    if (selectedProject) {
      await updateProject(selectedProject.id, data);
    } else {
      await createProject(data);
    }

    setIsModalOpen(false);

    loadProjects();
  };

  const handleDeleteRequest = (id) => {
    setDeleteId(id);

    setDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteProject(deleteId);

      setDeleteModal(false);

      setDeleteId(null);

      loadProjects();
    } finally {
      setLoading(false);
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

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedProject={selectedProject}
      />

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

      <ProjectTable
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
      />

      <ConfirmDeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default Dashboard;
