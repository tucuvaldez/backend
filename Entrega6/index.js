// Express settings
const express = require('express');
const app = express();

// JSON settings
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Handlebars setting
const handlebars = require('express-handlebars');

// Engine and app.set
const PORT = 8080
let path = require('path');
let { Server: HttpServer } = require('http');
let serverRoutes = require('./routes');
let Socket = require('./utils/sockets');
serverRoutes(app);
let httpServer = new HttpServer(app);
let socket = new Socket(httpServer);
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs')
app.use(express.static('public'))

// Products 
const Container = require('./api/productos')
const products = new Container('./resources/productos.txt')

// GET - POST - Scoket
app.get('/', (req, res) => {
    res.render('index', {})
})
app.get('/', async (req, res) => {
    const productos = await products.getAll();
    const length = productos.length > 0 ? true : false
    res.render('/', { productos, length })
})
app.post('/', async (req, res) => {
    let product = req.body
    if (product) {
        await products.save(product)
        console.log(`Producto guardado : ${JSON.stringify(product)}`)
        res.redirect('/')
    }
    else { res.sendStatus(400) }
})



/* Server Listen */

socket.init();
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})
httpServer.on('error', error => console.log(`Error en servidor ${error}`))