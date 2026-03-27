import { Router } from "express";
import { FavouriteController } from "./favourite.controller";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

const favouriteController = new FavouriteController();

router.get("/", authMiddleware, favouriteController.getFavourites);
router.post(
  "/:propertyId",
  authMiddleware,
  favouriteController.toggleFavourite,
);

export default router;
