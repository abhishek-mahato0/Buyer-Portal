import { FavouriteRepository } from "./favourite.repository";

export class FavouriteService {
  constructor(
    private readonly favouriteRepository: FavouriteRepository = new FavouriteRepository(),
  ) {}

  async toggleFavourite(userId: string, propertyId: string) {
    return await this.favouriteRepository.toggleFavourite(userId, propertyId);
  }

  async getFavourites(userId: string) {
    const favourites = await this.favouriteRepository.findAll(userId);
    return favourites.map((f) => f.property);
  }

  async getFavouriteIds(userId: string) {
    return await this.favouriteRepository.findAllIds(userId);
  }
}
