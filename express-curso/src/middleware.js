const express = require("express");
const morgan = require("morgan");

const app = express();
//se agrega esta linea (antes que llegue a la ruta) con su metodo text de express, para que pueda interpretar cuando el cliente envia un texto, y no quede como undefined
app.use(express.text());

//se agrega esta linea (antes que llegue a la ruta) con su metodo urlencoded de express, para que pueda interpretar cuando el cliente envia info por medio de un formulario por ej, y no quede como un objeto vacio
app.use(express.urlencoded({ extended: false }));

//se agrega esta linea (antes que llegue a la ruta) con su metodo json de express, para que pueda interpretar cuando el cliente envia un objeto en formato json, y no quede como un objeto vacio
app.use(express.json());

//MIDDLEWARES
app.use((req, res, next) => {
  console.log(`Route: ${req.url} Metodo: ${req.method}`);
  next();
});
//Reemplazo la funcion anterior por una que utiliza morgan
app.use(morgan("dev"));

//Este middleware corrobora datos, si se corresponde, autoriza el paso a la siguiente funcion, que seria la ruta a la pagina, sino, niega el acceso
app.use((req, res, next) => {
  if (req.query.login === "tucu@tucu.com") {
    next();
  } else {
    res.send("No authorization");
  }
});

app.get("/dashboard", (req, res) => {
  res.send("Dashboard Page");
});

app.listen(8000);
console.log(`Server on port ${8000}`);
