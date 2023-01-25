import mongoose from "mongoose";
import userModel from "./User.js";

const connection = mongoose.connect(
  "mongodb+srv://CoderUser:123@cluster0.ory38z3.mongodb.net/?retryWrites=true&w=majority",
  (err) => {
    if (err) console.log("Error:" + err);
    else console.log("Base conectada");
  }
);

const CRUD = async () => {
  userModel.create({ name: "Tucu", email: "tucu@tucu.com", password: 123 });
};

CRUD();
