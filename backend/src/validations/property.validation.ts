import v from "schema-validex";

export const createPropertySchema = v.object({
  title: v.string().nonempty(),
  description: v.string().nonempty(),
  price: v.number().min(0),
  location: v.string().nonempty(),
  country: v.string().nonempty(),
  rooms: v.number().min(1),
});
