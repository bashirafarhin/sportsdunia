import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { users } from "../utils/data.js";

// Hardcoded admin user
export const createAdminUser = async () => {
  const adminEmail = "admin@admin.com";
  const existingAdmin = users.find(u => u.email === adminEmail && u.role === "admin");
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin", 10);
    users.push({
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log("Admin user created.");
  } else {
    console.log("Admin user already exists.");
  }
};

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  if (users.find(u => u.email === email))
    return res.status(400).json({ message: "User already exists" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword, role: "user" });
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: "Error hashing password", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  req.session.user = { email: user.email, role: user.role };
  res.json({ message: "Login successful", user: { email: user.email, role: user.role } });
};

export const logoutUser = (req, res) => {
  res.clearCookie("connect.sid");
  req.session?.destroy(() => {
    return res.status(200).json({ message: "Logged out" });
  });
};

export const getProfile = (req, res) => {
  res.json({ user: req.session.user });
};
