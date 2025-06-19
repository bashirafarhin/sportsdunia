import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import session from "express-session";
import authRoutes from './routes/auth.route.js';

const app = express();
env.config();

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  app.set('trust proxy', 1); // Trust first proxy
}

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction, // true in production (HTTPS)
    sameSite: isProduction ? "none" : "lax", // cross-site cookies in production
  }
}));

app.use("/api/auth", authRoutes);

import { createAdminUser } from './controllers/auth.controller.js';
createAdminUser();

export default app;