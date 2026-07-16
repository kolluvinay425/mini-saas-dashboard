import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function ProjectTable({ projects, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Deadline</th>
            <th className="px-6 py-3 text-left">Assigned To</th>
            <th className="px-6 py-3 text-left">Budget</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-10 text-center text-gray-500">
                No projects found
              </td>
            </tr>
          ) : (
            currentProjects.map((project) => (
              <tr key={project.id} className="border-t">
                <td className="px-6 py-4">{project.name}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      project.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : project.status === "ON_HOLD"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {new Date(project.deadline).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">{project.assignedTo}</td>

                <td className="px-6 py-4">
                  €{Number(project.budget).toLocaleString()}
                </td>

                <td className="flex gap-3 px-6 py-4">
                  <button
                    onClick={() => onEdit(project)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit />
                  </button>

                  <button
                    onClick={() => onDelete(project.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {projects.length > itemsPerPage && (
        <div className="flex items-center justify-center gap-2 border-t px-6 py-4">
          <button
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
            className="rounded border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`rounded px-3 py-2 ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === totalPages}
            className="rounded border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectTable;
