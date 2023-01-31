import mongoose from "mongoose";

const mongoDB =
  "mongodb+srv://admin:1234@cluster0.ory38z3.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB);

const connect = () => {
  mongoose.connect(
    mongoDB,
    {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Base de datos conectada");
      }
    }
  );
};

connect();

export default connect;
