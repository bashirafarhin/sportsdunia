import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
          withCredentials: true,
        });
        setIsAuth(true);
      } catch {
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [navigate]);

  if (loading) return <p className="text-gray-600">Loading...</p>;

  return isAuth ? children : null;
};

export default ProtectedRoute;
