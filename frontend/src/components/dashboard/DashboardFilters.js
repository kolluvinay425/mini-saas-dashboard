import SearchBar from "../SearchBar";
import StatusFilter from "../StatusFilter";

function DashboardFilters({ search, setSearch, status, setStatus }) {
  return (
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
  );
}

export default DashboardFilters;
