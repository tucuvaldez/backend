import mongoose from "mongoose";
import config from "../../utilities/config.js";
import { promises as fs } from "fs";

await mongoose.connect(config.mongodb.connection, config.mongodb.options);

export default class ContenedorMongo {
  constructor(collectionName, schema, route) {
    this.collection = mongoose.model(collectionName, schema);
    this.route = route;
  }
  async checkCollection() {}
  async getAll() {}
  async getById(id) {}
  async save(elem) {}
  async update(elem) {}
  async delete(id) {}
  async deleteAll() {}
}
