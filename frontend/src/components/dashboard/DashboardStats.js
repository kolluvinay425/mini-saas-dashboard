import StatsCard from "../StatsCard";

import { FiFolder, FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";

function DashboardStats({ projects }) {
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
        mb-8
      "
    >
      <StatsCard
        title="Total Projects"
        value={projects.length}
        icon={<FiFolder />}
      />

      <StatsCard
        title="Active"
        value={projects.filter((p) => p.status === "ACTIVE").length}
        icon={<FiCheckCircle />}
      />

      <StatsCard
        title="On Hold"
        value={projects.filter((p) => p.status === "ON_HOLD").length}
        icon={<FiClock />}
      />

      <StatsCard
        title="Total Budget"
        value={`€${projects
          .reduce((sum, p) => sum + Number(p.budget), 0)
          .toLocaleString()}`}
        icon={<FiDollarSign />}
      />
    </div>
  );
}

export default DashboardStats;
