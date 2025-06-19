import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const RootLayout = lazy(() => import("./layouts/RootLayout"));
const Home = lazy(() => import("./pages/Home"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));
const AdminRoute = lazy(() => import("./routes/AdminRoute"));

// ADMIN_EMAIL = "admin@admin.com"
// ADMIN_PASSWORD = "admin"

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <RootLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
          </Route>

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <RootLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
          </Route>

          {/* Not Found Route */}
          <Route
            path="*"
            element={<div className="text-center p-6">Not Found</div>}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
