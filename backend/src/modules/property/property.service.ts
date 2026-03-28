import { PropertyRepository } from "./property.repository";
import { PropertyFilter, PaginationParams } from "./property.types";

export class PropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository = new PropertyRepository(),
  ) {}

  async getAllProperties(filter: PropertyFilter, pagination: PaginationParams) {
    return await this.propertyRepository.findAll(filter, pagination);
  }

  async getPropertyById(id: string) {
    return await this.propertyRepository.findById(id);
  }

  async createProperty(data: any) {
    return await this.propertyRepository.create(data);
  }

  async getMetadata() {
    const metadata = await this.propertyRepository.getMetadata();
    
    // Generate suggested price ranges based on min/max
    const { minPrice, maxPrice } = metadata;
    const ranges = [];
    const step = Math.ceil((maxPrice - minPrice) / 5 / 1000) * 1000 || 50000;
    
    for (let i = 0; i < 5; i++) {
      const start = minPrice + i * step;
      const end = i === 4 ? maxPrice : start + step;
      ranges.push({
        label: `$${start.toLocaleString()} - $${end.toLocaleString()}`,
        min: start,
        max: end,
      });
    }

    return {
      ...metadata,
      priceRanges: ranges,
    };
  }
}
