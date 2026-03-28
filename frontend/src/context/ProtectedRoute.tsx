import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { getItem } from "../utils/localstorage";

export const ProtectedRoute: React.FC = () => {
  const isAuth = getItem("token");
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
