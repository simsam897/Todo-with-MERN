import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // 1. Get token from cookie
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2. Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach decoded info to request
    req.user = decoded;

    // 4. Pass control to next function (controller)
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
