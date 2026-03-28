import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendError, sendSuccess } from "../../utils/response";
import { PropertyService } from "./property.service";
import { createPropertySchema } from "../../validations/property.validation";

export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService = new PropertyService(),
  ) {}

  getAllProperties = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined;
    const location = req.query.city as string;
    const country = req.query.country as string;
    const rooms = req.query.rooms ? parseInt(req.query.rooms as string) : undefined;

    const data = await this.propertyService.getAllProperties(
      { minPrice, maxPrice, location, country, rooms },
      { page, limit },
    );

    sendSuccess(res, data, "Properties fetched successfully");
  });

  getPropertyById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const property = await this.propertyService.getPropertyById(id);

    if (!property) {
      return sendError(res, "Property not found", 404);
    }

    sendSuccess(res, property, "Property fetched successfully");
  });

  createProperty = asyncHandler(async (req: Request, res: Response) => {
    const property = await this.propertyService.createProperty(req.body);
    res.status(201);
    sendSuccess(res, property, "Property created successfully");
  });

  getMetadata = asyncHandler(async (req: Request, res: Response) => {
    const metadata = await this.propertyService.getMetadata();
    sendSuccess(res, metadata, "Metadata fetched successfully");
  });
}
