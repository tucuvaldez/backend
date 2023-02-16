import mongoose from "mongoose";

export const productModelName = "products";

export const productsSchema = new mongoose.Schema({
  cant: { type: String, required: true },
  description: { type: Array, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  src: { type: String, required: true },
  stock: { type: Number, required: true },
});
// const productsModel = mongoose.model("products", productsSchema);

export default { productsSchema, productModelName };
