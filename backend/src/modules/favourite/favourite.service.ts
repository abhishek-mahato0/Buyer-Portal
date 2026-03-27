import { FavouriteRepository } from "./favourite.repository";

export class FavouriteService {
  constructor(
    private readonly favouriteRepository: FavouriteRepository = new FavouriteRepository(),
  ) {}

  async toggleFavourite(userId: string, propertyId: string) {
    const existingFavourite =
      await this.favouriteRepository.findByUserIdAndPropertyId(
        userId,
        propertyId,
      );

    if (existingFavourite) {
      await this.favouriteRepository.delete(userId, propertyId);
      return { message: "Favourite removed" };
    }

    await this.favouriteRepository.create(userId, propertyId);
    return { message: "Favourite added" };
  }

  async getFavourites(userId: string, page: number, limit: number) {
    return await this.favouriteRepository.findByUserId(userId, page, limit);
  }
}
