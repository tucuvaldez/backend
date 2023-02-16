import mongoose from "mongoose";
import config from "../../utilities/config.js";

try {
  await mongoose.connect(config.mongodb.connection, config.mongodb.options);
} catch (error) {
  throw Error(error);
}
