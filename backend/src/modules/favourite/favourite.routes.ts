import { Router } from "express";
import { FavouriteController } from "./favourite.controller";
import { authMiddleware } from "../../middleware/auth";

const router = Router();
const favouriteController = new FavouriteController();

router.use(authMiddleware);

router.get("/", favouriteController.getFavourites);
router.get("/ids", favouriteController.getFavouriteIds);
router.post("/toggle", favouriteController.toggleFavourite);

export default router;
