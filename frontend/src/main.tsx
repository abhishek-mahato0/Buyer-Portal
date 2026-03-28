import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import QueryProvider from "./context/QueryProvider.tsx";
import { RouterProvider } from "react-router";
import "/@flash.css";
import { ToastContainer } from "react-toastify";
import { router } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryProvider>
  </StrictMode>,
);
