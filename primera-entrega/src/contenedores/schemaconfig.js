import mongoose from "mongoose";

const productModelName = "product";

const productSchema = new mongoose.Schema({
  cant: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: Array, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  src: { type: String, required: true },
  stock: { type: Number, required: true },
});

const cartModelName = "cart";

const cartSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  timestamp: { type: String, required: true },
});

export { productModelName, productSchema, cartModelName, cartSchema };
