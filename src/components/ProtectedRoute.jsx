import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
