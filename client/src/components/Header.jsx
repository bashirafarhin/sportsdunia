import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import useDarkMode from "../hooks/useDarkMode";
import { Moon, Sun, Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isDark, toggleDarkMode] = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {}, {
        withCredentials: true,
      });
      enqueueSnackbar("Logged out successfully", { variant: "success" });
      navigate("/");
    } catch (err) {
      enqueueSnackbar("Logout failed", { variant: "error" });
    }
  };

  return (
    <header className="bg-blue-600 dark:bg-gray-900 text-white shadow-md">
      <nav className="flex justify-between container mx-auto items-center p-4 relative">
        <div className="font-bold text-xl">Project</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/home" className="hover:text-blue-200 dark:hover:text-gray-300 transition-colors duration-200">
            Home
          </Link>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-blue-700 dark:bg-gray-800 hover:bg-blue-800 dark:hover:bg-gray-700"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun size={20} className="text-yellow-300" />
            ) : (
              <Moon size={20} className="text-blue-100" />
            )}
          </button>

          <button
            onClick={handleLogout}
            className="bg-white dark:bg-gray-800 text-blue-600 dark:text-white px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full right-4 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 flex flex-col py-2 text-black dark:text-white md:hidden">
            <Link
              to="/home"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              Home
            </Link>

            <hr className="border-t border-gray-200 dark:border-gray-700" />

            <button
              onClick={() => {
                toggleDarkMode();
                setMenuOpen(false);
              }}
              className="flex items-center justify-between px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              {isDark ? "Light Mode" : "Dark Mode"}
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <hr className="border-t border-gray-200 dark:border-gray-700" />

            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
