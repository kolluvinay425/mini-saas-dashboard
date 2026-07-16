function StatusFilter({ status, setStatus }) {
  return (
    <div className="relative">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="
          appearance-none
          px-4
          py-2
          pr-10
          border
          rounded-lg
          bg-white
        "
      >
        <option value="">All Status</option>
        <option value="ACTIVE">Active</option>
        <option value="ON_HOLD">On Hold</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <span
        className="
        pointer-events-none
        absolute
        right-3
        top-1/2
        -translate-y-1/2
      "
      >
        ▼
      </span>
    </div>
  );
}

export default StatusFilter;
