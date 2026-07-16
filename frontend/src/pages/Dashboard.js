import { useEffect, useState } from "react";

import ProjectTable from "../components/ProjectTable";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import ProjectModal from "../components/ProjectModal";

import { fetchProjects, createProject, updateProject } from "../api/projectApi";

function Dashboard() {
  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

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
        onDelete={(id) => console.log(id)}
      />
    </div>
  );
}

export default Dashboard;
