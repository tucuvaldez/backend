const Contenedor = require('./entrega2')

async function test() {
    let productos = new Contenedor('productos.txt')
    let save = await productos.save({
        "name": 'Jean Mujer',
        "price": 18000,
        "src": '/resources/img/productos-img/jeanMujer.jpg'
    });

    let getAll = await productos.getAll();
    let getById = await productos.getById('1');
    let deleteById = await productos.deleteById('2');
    //let deleteAll = await productos.deleteAll();
    console.log(save);
    console.log(getAll);
    console.log(getById);
    console.log(deleteById);
    // console.log(deleteAll);
};

test();