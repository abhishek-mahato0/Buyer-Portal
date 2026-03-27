import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import QueryProvider from "./context/QueryProvider.tsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>,
);
