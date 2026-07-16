function DashboardError({ error }) {
  if (!error) {
    return null;
  }

  return (
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
      "
    >
      {error}
    </div>
  );
}

export default DashboardError;
