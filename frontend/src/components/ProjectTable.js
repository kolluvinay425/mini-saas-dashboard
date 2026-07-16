import { FiEdit, FiTrash2 } from "react-icons/fi";

function ProjectTable({ projects, onEdit, onDelete }) {
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
          {projects.map((project) => (
            <tr key={project.id} className="border-t">
              <td className="px-6 py-4">{project.name}</td>

              <td className="px-6 py-4">
                <span
                  className={`
                                        px-3 py-1 rounded-full text-sm
                                        ${
                                          project.status === "ACTIVE"
                                            ? "bg-green-100 text-green-700"
                                            : project.status === "ON_HOLD"
                                              ? "bg-yellow-100 text-yellow-700"
                                              : "bg-blue-100 text-blue-700"
                                        }
                                        `}
                >
                  {project.status}
                </span>
              </td>

              <td className="px-6 py-4">
                {new Date(project.deadline).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">{project.assignedTo}</td>

              <td className="px-6 py-4">€{project.budget}</td>

              <td className="px-6 py-4 flex gap-3">
                <button
                  onClick={() => onEdit(project)}
                  className="text-blue-600"
                >
                  <FiEdit />
                </button>

                <button
                  onClick={() => onDelete(project.id)}
                  className="text-red-600"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;
