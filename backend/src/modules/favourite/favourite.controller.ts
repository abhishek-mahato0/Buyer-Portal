import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../utils/response";
import { FavouriteService } from "./favourite.service";

export class FavouriteController {
  constructor(
    private readonly favouriteService: FavouriteService = new FavouriteService(),
  ) {}

  toggleFavourite = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { propertyId } = req.body;
    const result = await this.favouriteService.toggleFavourite(userId, propertyId);
    sendSuccess(res, result, `Property ${result.action} to favourites`);
  });

  getFavourites = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const properties = await this.favouriteService.getFavourites(userId);
    sendSuccess(res, properties, "Favourite properties fetched successfully");
  });

  getFavouriteIds = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const ids = await this.favouriteService.getFavouriteIds(userId);
    sendSuccess(res, ids, "Favourite IDs fetched successfully");
  });
}
