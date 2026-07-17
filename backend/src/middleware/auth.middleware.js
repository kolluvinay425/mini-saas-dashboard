import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token required",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }

    // Verify JWT signature and check token expiration before allowing access.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store authenticated user data for use in protected routes.
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
