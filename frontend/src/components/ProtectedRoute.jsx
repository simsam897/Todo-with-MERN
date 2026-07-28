import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>
  }


  if (!user) {

    return <Navigate to="/signin" replace />

  }

  return children;

}

export default ProtectedRoute;