//Importo dependencias
import mongoose from "mongoose";

//Definimos el schema del documento y modelo para interactuar con la base de datos
export const cartModelName = "carts";
export const cartSchema = new mongoose.Schema({
  products: [{ type: Object, required: true }],
});
// const cartModel = mongoose.model("cart", cartSchema);

export default { cartSchema, cartModelName };
