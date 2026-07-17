import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import projectRoutes from "./routes/project.route.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());
// Adds common HTTP security headers.
app.use(helmet());
// Logs HTTP requests in development format
app.use(morgan("dev"));
// Parse JSON request bodies
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    message: "API is running",
  });
});

export default app;
