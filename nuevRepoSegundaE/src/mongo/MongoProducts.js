import { checkProduct } from "../utilities/utilities.js";
import { productModelName, productsSchema } from "../models/productsSchema.js";
import MongoContainer from "./MongoContainer.js";

class MongoProducts extends MongoContainer {
  constructor() {
    super(productModelName, productsSchema);
  }
  async saveProduct(product) {
    if (product.id) {
      delete product.id;
    }
    if (checkProduct(product)) {
      let response = this.collection.create(product);
      return response;
    }
    throw new Error("Invalid Product");
  }
  async updateProduct(product, productId) {
    let response = this.collection.updateOne({ _id: productId }, product);
    if (product) {
      return response;
    } else {
      throw new Error(400);
    }
  }
}

export default MongoProducts;
