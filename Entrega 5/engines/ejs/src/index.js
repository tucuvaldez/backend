const express = require('express');
const app = express()
// JSON settings
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Engine set
app.set('views', '../views');
app.set('view engine', 'ejs');
// Products 
const Container = require('../../../api/productos')
const products = new Container('../../../resources/productos.txt')

// GET and POST

app.get('/', (req, res) => {
    res.render('index', {})
})
app.post('/productos', async (req, res) => {
    let product = req.body
    if (product) {
        await products.saveProduct(product)
        console.log(`Producto guardado : ${JSON.stringify(product)}`)
        res.redirect('/')
    }
    else { res.sendStatus(400) }

})
app.get('/productos', async (req, res) => {
    const productos = await products.getAll()
    res.render('prod', { productos })
})

app.listen(8080)