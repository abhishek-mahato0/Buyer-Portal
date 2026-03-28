import { prisma } from "../../lib/prisma";
import { PropertyFilter, PaginationParams } from "./property.types";

export class PropertyRepository {
  async findAll(filter: PropertyFilter, pagination: PaginationParams) {
    const { minPrice, maxPrice, location, country, rooms } = filter;
    const { page, limit } = pagination;

    const where: any = {};

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (location) {
      where.location = {
        contains: location,
        mode: "insensitive",
      };
    }

    if (country) {
      where.country = {
        contains: country,
        mode: "insensitive",
      };
    }

    if (rooms !== undefined) {
      where.rooms = rooms;
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.property.count({ where }),
    ]);

    return {
      properties,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return await prisma.property.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return await prisma.property.create({
      data,
    });
  }

  async getMetadata() {
    const [locations, countries, priceStats] = await Promise.all([
      prisma.property.findMany({
        distinct: ["location"],
        select: { location: true },
      }),
      prisma.property.findMany({
        distinct: ["country"],
        select: { country: true },
      }),
      prisma.property.aggregate({
        _min: { price: true },
        _max: { price: true },
      }),
    ]);

    return {
      locations: locations.map((l) => l.location),
      countries: countries.map((c) => c.country),
      minPrice: priceStats._min.price || 0,
      maxPrice: priceStats._max.price || 1000000,
    };
  }
}
