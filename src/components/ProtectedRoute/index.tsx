import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../Constants/storageUtilities";

const ProtectedRoute: React.FC = () => {
  const jwtToken = getCookie();

  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
