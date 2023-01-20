// const http = require('http');
// const fs = require('fs')

// const server = http.createServer((req, res) => {
//   const read = fs.createReadStream('./static/index.html')
//   read.pipe(res)
// })

// server.listen(8000)
// console.log(`Server on port ${8000}`)

const express = require("express");
const app = express();

//app.get para indicar las rutas --> /about, /contact, etc.
//app.use para indicar una ruta que no existe, app.use((req, res)=>{res.status(404).send(`Not Found)})

// app.get("/", (req, res) => {
//   res.sendFile("./static/index.html", { root: __dirname });
// });

// app.get("/products", (req, res) => {
//   Aqui puedo poner logica para ---> validar datos, consultar base de datos, procesar datos, etc
//   res.send("Creando productos");
// });

// Para enviar un archivo utilizo sendFile, indico la ruta del archivo (puede ser cualquier archivo), entre llaves, le indico la raiz donde buscar
// app.get("/miarchivo", (req, res) => {
//   res.sendFile("./DJI_0001.JPG", {
//     root: __dirname,
//   });
// });

// Para enviar objetos json, se utiliza res.json()

// app.get("/productos", (req, res) => {
//   res.json({ productos: "Heladera" });
// });

// app.post("/products", (req, res) => {
//   res.send("Creando productos");
// });

// app.put("/products", (req, res) => {
//   res.send("Actualizando productos");
// });

// app.delete("/products", (req, res) => {
//   res.send("Eliminando productos");
// });

// app.patch("/products", (req, res) => {
//   res.send("Actualizando una parte de productos");
// });

// El cliente va a Enviar en formato json

//se agrega esta linea (antes que llegue a la ruta) con su metodo text de express, para que pueda interpretar cuando el cliente envia un texto, y no quede como undefined
app.use(express.text());

//se agrega esta linea (antes que llegue a la ruta) con su metodo urlencoded de express, para que pueda interpretar cuando el cliente envia info por medio de un formulario por ej, y no quede como un objeto vacio
app.use(express.urlencoded({ extended: false }));

//se agrega esta linea (antes que llegue a la ruta) con su metodo json de express, para que pueda interpretar cuando el cliente envia un objeto en formato json, y no quede como un objeto vacio
app.use(express.json());

app.post("/user", (req, res) => {
  console.log(req.body);
  res.send("Nuevo usuario creado");
});

//Explicacion en notas.txt ---- donde explica como ahorrar codigo
app.get("/add/:x/:y", (req, res) => {
  const result = parseInt(req.params.x) + parseInt(req.params.y);
  res.send(`Result: ${result}`);
});

app.listen(8000);
console.log(`Server on port ${8000}`);
