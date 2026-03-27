import { prisma } from "../../lib/prisma";

export class FavouriteRepository {
  async create(userId: string, propertyId: string) {
    return await prisma.favourite.create({
      data: {
        userId,
        propertyId,
      },
    });
  }

  async delete(userId: string, propertyId: string) {
    return await prisma.favourite.delete({
      where: {
        userId_propertyId: { userId, propertyId },
      },
    });
  }

  async findByUserId(userId: string, page: number, limit: number) {
    return await prisma.favourite.findMany({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findByPropertyId(propertyId: string) {
    return await prisma.favourite.findMany({
      where: { propertyId },
      include: {
        user: true,
      },
    });
  }

  async findByUserIdAndPropertyId(userId: string, propertyId: string) {
    return await prisma.favourite.findUnique({
      where: { userId_propertyId: { userId, propertyId } },
    });
  }
}
