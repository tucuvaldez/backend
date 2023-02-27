const express = require("express");
const morgan = require("morgan");

const app = express();
//CREO MANUALMENTE UN ARREGLO DE JSON PARA EJEMPLO
let products = [
  {
    id: 1,
    name: "Laptop",
    price: 3000,
  },
];

app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

//PARA OBTENER LOS PRODUCTOS
app.get("/products", (req, res) => {
  res.json(products);
});

//PARA AGREGAR UN PRODUCTO, Y DEBO UTILIZAR LOS REQ ----> EN ESTE CASO REQ.BODY
//SI QUISIERA QUE SE AGREGUE UN PRODUCTO A LA LISTA, DEBO HACER UN PUSH A ESE ARRAY, SI QUISIERA QUE SE AGREGUE COMO ESTABA, Y SUMARLE ALGUN ATRIBUTO,  DENTRO DE UN OBJETO, DEBO AGREGAR PUNTOS SUSPENSIVOS SEPARAR CON COMA, Y AGREGAR EL NUEVO ATRIBUTO.
//SI QUIERO SUMAR EN ESTE CASO EL ID, PUEDO UTILIZAR EL ATRIBUTO LENGTH Y SUMARLE UNO A CADA NUEVO PROD
app.post("/products", (req, res) => {
  const newProd = { ...req.body, id: products.length + 1 };
  products.push(newProd);
  res.send(products);
  console.log(products);
});

//UTILIZO MAP PARA RECORRER CADA UNO DE LOS ELEMENTOS DEUN ARRAY, BUSCANDO CON UNA PROPIEDAD EN ESTE CASO ID, Y ACTUALIZO TODO EL ARRAY, AGREGANDO DE NUEVO LO QUE YA ESTABA, MAS ESE PROD CON LA NUEVA INFORMACION
app.put("/products/:id", (req, res) => {
  const newData = req.body;
  const productFound = products.find(
    (prod) => prod.id === parseInt(req.params.id)
  );
  if (!productFound)
    return res.status(404).send({ message: "Product not found" });
  products = products.map((p) =>
    p.id === parseInt(req.params.id) ? { ...p, ...newData } : p
  );
  res.json({ message: "Product updated" });
});

//PUEDO UTILIZAR EL METODO FILTER, YA QUE COMPARA LOS ID QUE SON DISTINTOS AL QUE ESTOY ENVIANDO, Y ME DEVUELVE TODOS LOS PRODUCTOS EXCEPTO EL QUE COINCIDE.
//POR LO CUAL, SI GUARDO TODO ESE NUEVO ARREGLO, EL PROD QUE ENVIO POR ID, NO SE GUARDA
app.delete("/products/:id", (req, res) => {
  const productFound = products.find(
    (prod) => prod.id === parseInt(req.params.id)
  );
  if (!productFound)
    return res.status(404).send({ message: "Product not found" });

  products = products.filter((prod) => prod.id !== parseInt(req.params.id));
  console.log("Product deleted: " + productFound.name);
  res.sendStatus(204);
});

//PARA OBTENER POR ID, DEBO UTILIZAR LA FUNCION FIND. DECLARO UNA CONSTANTE, BUSCO DENTRO DEL ARRAY EL PRODUCTO CON EL ID QUE NECESITO, Y LO DEVUELVO. PUEDO PONER SOLO 2 IGUALES (ya que compara un numero con un string), O PONER 3 Y AGREGAR EL parseInt PARA CONVERTIRLO PRIMERO A NUMERO
app.get("/products/:id", (req, res) => {
  const productFound = products.find(
    (prod) => prod.id === parseInt(req.params.id)
  );
  if (!productFound)
    return res.status(404).send({ message: "Product not found" });
  res.json(productFound);
});

app.listen(8000);
console.log(`Server on port http://localhost:${8000}`);
