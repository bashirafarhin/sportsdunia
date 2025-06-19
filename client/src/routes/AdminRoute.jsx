import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminRoute = ({ children }) => {
  const [role, setRole] = useState(null); // null | 'reader' | 'other'
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
          withCredentials: true,
        });
        setRole(res.data?.user?.role);
      } catch {
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [navigate]);

  if (loading) return <p className="text-gray-600">Loading...</p>;
  
  if (role !== 'admin') {
    return <p className="text-red-600 text-lg">You are not authorized to access this page.</p>;
  }

  return children;
};

export default AdminRoute;
