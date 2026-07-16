function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
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
                p-6
                w-full
                max-w-sm
            "
      >
        <h2
          className="
                    text-xl
                    font-bold
                    mb-4
                "
        >
          Delete Project?
        </h2>

        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this project?
        </p>

        <div
          className="
                    flex
                    justify-end
                    gap-3
                "
        >
          <button
            onClick={onClose}
            className="
                            px-4
                            py-2
                            border
                            rounded
                        "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
                            px-4
                            py-2
                            bg-red-600
                            text-white
                            rounded
                        "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
