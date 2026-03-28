import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Favourites from "../pages/Favourites";
import { ProtectedRoute } from "../context/ProtectedRoute";
import Layout from "../components/organisms/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        Component: Dashboard,
      },
      {
        path: "favourites",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            Component: Favourites,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);
