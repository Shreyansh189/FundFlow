import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

const ProtectedRoute = ({ children, requireFounder = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireFounder && user.role !== 'founder') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
