const express = require('express');
const app = express();
const PORT = 8080;
const { Router } = require('express');
// let serverRoutes = require('./routes');


const Container = require('./components/productos/index');
const products = new Container('./products.txt');

app.use(express.static('./public'));

const routerProd = new Router();
routerProd.use(express.json());
routerProd.use(express.urlencoded({ extended: true }));

routerProd.get("/", async (req, res, next) => {
    const allProd = await products.getAll();
    if (allProd.length > 0) { res.json(allProd); }
    else { res.sendStatus(404); }
})

app.use('/api/productos', routerProd);

routerProd.get('/:id', async (req, res, next) => {
    const prodId = await products.getById(req.params.id)
    if (prodId) {
        res.json({
            busqueda: `Prod con id ${req.params.id}`,
            res: prodId
        })
    } else { res.sendStatus(404); }
})

routerProd.post('/', async (req, res) => {
    let addProd = req.body

    if (addProd) {
        await products.save(addProd)
        res.json({
            newProduct: addProd
        })
    }
    else { res.sendStatus(400) }

})

// DELETE de un producto

routerProd.delete('/:id', async (req, res) => {
    const prod = req.params.id
    try {
        let deleted = await products.deleteById(prod)
        res.json({
            //podrias darme una mano para mostrar el "deleted", no me doy cuenta como mostrarlo
            prodDeleted: deleted,
            products: await products.getAll()
        })
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }
})

// PUT reemplazando un producto existente por uno nuevo
// en este caso, puedo modificar pasando los datos por el body, pero no entiendo muy bien el porque del /:id, me podrias explicar por favor? Mil gracias
routerProd.put('/:id', async (req, res) => {

    const result = await products.update(req.body)
    console.log(result)
    if (result.length > 0) {
        res.send(`
        El producto : ${JSON.stringify(result[1])}\n\n
         reemplazado por : ${JSON.stringify(result[0])}
         en el posicion : ${result[0].id}
        `)
    }
    else {
        res.sendStatus(400)
    }
})

// serverRoutes(app);



app.listen(PORT, () => console.log(`http://localhost:${PORT}`));