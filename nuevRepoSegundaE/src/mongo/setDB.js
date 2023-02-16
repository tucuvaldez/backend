import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connection = await mongoose.connect(
  "mongodb+srv://admin:1234@ecommerce.m36ybw2.mongodb.net/ecommerce?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err + "Error al conectar a la base de datos");
    } else {
      console.log("Conectado a la base de datos de Mongo");
    }
  }
);

export default connection;
