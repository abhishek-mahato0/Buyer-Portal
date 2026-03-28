import { Router } from "express";
import { PropertyController } from "./property.controller";
import { validate } from "../../middleware/validate";
import { createPropertySchema } from "../../validations/property.validation";
import { adminMiddleWare, authMiddleware } from "../../middleware/auth";

const router = Router();
const propertyController = new PropertyController();

router.get("/", propertyController.getAllProperties);
router.get("/metadata", propertyController.getMetadata);
router.get("/:id", propertyController.getPropertyById);
router.post(
  "/",
  validate(createPropertySchema),
  authMiddleware,
  adminMiddleWare,
  propertyController.createProperty,
);

export default router;
