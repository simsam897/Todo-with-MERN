import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/todo" replace />;
  }

  return children;
};

export default PublicRoute;