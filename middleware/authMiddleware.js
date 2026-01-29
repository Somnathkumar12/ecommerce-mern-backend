import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
};

export const admin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "Admin only" });
  next();
};
