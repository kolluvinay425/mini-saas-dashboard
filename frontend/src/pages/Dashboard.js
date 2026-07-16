import { useEffect, useState } from "react";

import ProjectTable from "../components/ProjectTable";

import { fetchProjects } from "../api/projectApi";

function Dashboard() {
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const data = await fetchProjects();

    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Mini SaaS Dashboard</h1>

      <ProjectTable
        projects={projects}
        onEdit={(project) => console.log(project)}
        onDelete={(id) => console.log(id)}
      />
    </div>
  );
}

export default Dashboard;
