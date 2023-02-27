const express = require("express");
const app = express();

const HomeRoutes = require("./routes/home");
const UsersRoutes = require("./routes/users");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.text());

app.use(HomeRoutes);
app.use(UsersRoutes);

app.listen(8000);
console.log(`Server on port ${8000}`);
