const app = require('./server.js')

const PORT = 8081
const server = app.listen(PORT, () => {
    // console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
    console.log(`Servidor http escuchando en el puerto http://localhost:${PORT}`)

})
server.on('error', error => console.log(`Error en servidor ${error}`))