import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import DashboardHeader from "../components/dashboard/DashboardHeader";

import ProjectTable from "../components/ProjectTable";
import ProjectModal from "../components/ProjectModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import useProjects from "../hooks/useProjects";
import Notification from "../components/Notification";
function Dashboard() {
  const {
    projects,
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
  } = useProjects();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <DashboardHeader />

      <Notification message={notification.message} type={notification.type} />
      <DashboardFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <button
        onClick={handleCreate}
        className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-4
        py-2
        rounded-lg
        mb-6
        transition
        duration-200
    "
      >
        + Add Project
      </button>

      <DashboardStats projects={projects} />

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

      <ConfirmDeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default Dashboard;
