import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import useDarkMode from "../hooks/useDarkMode";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isDark, toggleDarkMode] = useDarkMode();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        form,
        { withCredentials: true }
      );
      const profile = res.data.user;
      if (profile.role === "admin") {
        navigate("/admin");
      } else if (profile.role === "user") {
        navigate("/home");
      } else {
        enqueueSnackbar("Unknown role. Access denied.", { variant: "error" });
        navigate("/");
      }
      enqueueSnackbar("Login successful", { variant: "success" });
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-50 dark:bg-gray-900 transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Not signed up?{" "}
          <Link
            to="/register"
            className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Register here
          </Link>
        </p>

        <button
          type="button"
          onClick={toggleDarkMode}
          className="mt-6 text-center w-full text-sm underline text-gray-500 dark:text-gray-300"
        >
          Toggle to {isDark ? "Light" : "Dark"} Mode
        </button>
        <p className="mt-2 text-s text-center text-gray-500 dark:text-gray-400">
          <strong>Note:</strong> Use <br />
          <span className="font-mono">email-admin@admin.com</span> <br />
          <span className="font-mono">password-admin</span> to login as admin.
        </p>
      </form>
    </div>
  );
}
