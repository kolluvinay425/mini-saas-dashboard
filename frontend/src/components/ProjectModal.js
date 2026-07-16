import { useEffect } from "react";
import { useForm } from "react-hook-form";

function ProjectModal({ isOpen, onClose, onSubmit, selectedProject }) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (selectedProject) {
      reset({
        ...selectedProject,
        deadline: selectedProject.deadline
          ? selectedProject.deadline.substring(0, 10)
          : "",
      });
    } else {
      reset({
        name: "",
        status: "ACTIVE",
        deadline: "",
        assignedTo: "",
        budget: "",
      });
    }
  }, [selectedProject, reset]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        p-4
   "
    >
      <div
        className="
        bg-white
        rounded-lg
        w-full
        max-w-lg
        p-6
            "
      >
        <h2
          className="
                    text-xl
                    font-bold
                    mb-5
                "
        >
          {selectedProject ? "Edit Project" : "Add Project"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name")}
            placeholder="Project name"
            className="
            w-full
            border
            rounded
            px-3
            py-2
          "
          />

          <select
            {...register("status")}
            className="
            w-full
            border
            rounded
            px-3
            py-2
        "
          >
            <option value="ACTIVE">Active</option>

            <option value="ON_HOLD">On Hold</option>

            <option value="COMPLETED">Completed</option>
          </select>

          <input
            type="date"
            {...register("deadline")}
            onKeyDown={(e) => e.preventDefault()}
            min="2000-01-01"
            max="2100-12-31"
            className="
            w-full
            border
            rounded
            px-3
            py-2
        "
          />

          <input
            {...register("assignedTo")}
            placeholder="Assigned team member"
            className="
            w-full
            border
            rounded
            px-3
            py-2
        "
          />

          <input
            type="number"
            {...register("budget")}
            placeholder="Budget"
            className="
            w-full
            border
            rounded
            px-3
            py-2"
          />

          <div
            className="
                flex
                justify-end
                gap-3"
          >
            <button
              type="button"
              onClick={onClose}
              className="
                px-4
                py-2
                border
                rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-4
                py-2
                bg-blue-600
                text-white
                rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectModal;
