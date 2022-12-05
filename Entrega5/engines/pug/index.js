const express = require('express');
const app = express()
// JSON settings
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Engine set
app.set('views', './engines/pug/views');
app.set('view engine', 'pug');
// Products 
const Container = require('../../api/productos')
const products = new Container('./resources/productos.txt')
// GET and POST
app.get('/', (req, res) => {
    res.render('form.pug', {})
})
app.get('/productos', async (req, res) => {
    const productos = await products.getAll();
    res.render('prod.pug', { productos })
})
app.post('/productos', async (req, res) => {
    let product = req.body
    if (product) {
        await products.save(product)
        console.log(`Producto guardado : ${JSON.stringify(product)}`)
        res.redirect('/')
    }
    else { res.sendStatus(400) }
})

/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))