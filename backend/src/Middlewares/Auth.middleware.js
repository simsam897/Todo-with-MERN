import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // Get JWT from the httpOnly cookie
    const token = req.cookies?.access_token;

    // No token
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store decoded user information
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized - invalid or expired token",
    });
  }
};
