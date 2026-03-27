import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendError, sendSuccess } from "../../utils/response";
import { FavouriteService } from "./favourite.service";

export class FavouriteController {
  constructor(
    private readonly favouriteService: FavouriteService = new FavouriteService(),
  ) {}

  toggleFavourite = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as { id: string };
    if (!user) {
      sendError(res, "User not found", 404);
    }
    const propertyId = req.params.propertyId as string;
    if (!propertyId) {
      sendError(res, "Property not found", 404);
    }
    const data = await this.favouriteService.toggleFavourite(
      user.id,
      propertyId,
    );
    sendSuccess(res, data, "Favourite toggled");
  });

  getFavourites = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as { id: string };
    if (!user) {
      sendError(res, "User not found", 404);
    }
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const data = await this.favouriteService.getFavourites(
      user.id,
      page,
      limit,
    );
    sendSuccess(res, data, "Favourites fetched");
  });
}
