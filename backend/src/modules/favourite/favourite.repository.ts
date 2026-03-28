import { prisma } from "../../lib/prisma";

export class FavouriteRepository {
  async toggleFavourite(userId: string, propertyId: string) {
    const existing = await prisma.favourite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });

    if (existing) {
      await prisma.favourite.delete({
        where: { id: existing.id },
      });
      return { action: "removed", propertyId };
    }

    await prisma.favourite.create({
      data: {
        userId,
        propertyId,
      },
    });
    return { action: "added", propertyId };
  }

  async findAll(userId: string) {
    return await prisma.favourite.findMany({
      where: { userId },
      include: {
        property: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findAllIds(userId: string) {
    const favourites = await prisma.favourite.findMany({
      where: { userId },
      select: { propertyId: true },
    });
    return favourites.map((f) => f.propertyId);
  }

  async isFavourited(userId: string, propertyId: string) {
    const favourite = await prisma.favourite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });
    return !!favourite;
  }
}
