// src/index.ts
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./modules/auth/auth.routes";
import favouriteRoutes from "./modules/favourite/favourite.routes";
import propertyRoutes from "./modules/property/property.routes";
import cors from "cors";
import { errorMiddleware } from "./middleware/errorHandler";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/favourite", favouriteRoutes);
app.use("/api/property", propertyRoutes);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
