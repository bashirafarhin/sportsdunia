export const isAuthenticated = (req, res, next) => {
  if (req.session?.user) return next();
  return res.status(401).json({ message: "Not authenticated" });
};

export const isAdmin = (req, res, next) => {
  if (req.session?.user?.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
};