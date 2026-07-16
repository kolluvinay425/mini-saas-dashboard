import sequelize from "../config/database.js";
import Project from "../models/project.model.js";

const projects = [
  {
    name: "CRM Dashboard",
    status: "ACTIVE",
    deadline: "2026-08-20",
    assignedTo: "John Smith",
    budget: 5000,
  },

  {
    name: "Mobile Banking App",
    status: "ACTIVE",
    deadline: "2026-09-15",
    assignedTo: "Sarah Johnson",
    budget: 12000,
  },

  {
    name: "Inventory Management",
    status: "ON_HOLD",
    deadline: "2026-07-30",
    assignedTo: "David Brown",
    budget: 7500,
  },

  {
    name: "Restaurant Ordering System",
    status: "COMPLETED",
    deadline: "2026-06-10",
    assignedTo: "Michael Lee",
    budget: 4500,
  },

  {
    name: "HR Management Portal",
    status: "ACTIVE",
    deadline: "2026-10-05",
    assignedTo: "Emma Wilson",
    budget: 9000,
  },

  {
    name: "E-commerce Platform",
    status: "ACTIVE",
    deadline: "2026-11-01",
    assignedTo: "Alex Miller",
    budget: 15000,
  },

  {
    name: "AI Customer Support",
    status: "ON_HOLD",
    deadline: "2026-12-15",
    assignedTo: "Daniel Garcia",
    budget: 11000,
  },

  {
    name: "Fitness Tracking App",
    status: "COMPLETED",
    deadline: "2026-05-20",
    assignedTo: "Sophia Taylor",
    budget: 6000,
  },

  {
    name: "Travel Booking System",
    status: "ACTIVE",
    deadline: "2026-09-25",
    assignedTo: "James Anderson",
    budget: 13000,
  },

  {
    name: "School Management System",
    status: "ON_HOLD",
    deadline: "2026-08-01",
    assignedTo: "Olivia Martin",
    budget: 8000,
  },
];

const seedProjects = async () => {
  try {
    await sequelize.authenticate();

    await Project.destroy({
      where: {},
      truncate: true,
    });

    await Project.bulkCreate(projects);

    console.log("Projects seeded successfully");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await sequelize.close();
  }
};

seedProjects();
