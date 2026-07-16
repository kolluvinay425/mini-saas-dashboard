import { useEffect, useState } from "react";

import ProjectTable from "../components/ProjectTable";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";

import { fetchProjects } from "../api/projectApi";

function Dashboard() {
  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

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

      <ProjectTable
        projects={projects}
        onEdit={(project) => console.log(project)}
        onDelete={(id) => console.log(id)}
      />
    </div>
  );
}

export default Dashboard;
