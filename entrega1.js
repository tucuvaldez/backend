class Usuario {

    constructor(nombre, apellido, libros, mascotas) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName() {
        console.log(`El nombre del usuario es ${this.nombre} ${this.apellido}`)
    }

    addMascota(mascotas) {
        this.mascotas.push(mascotas);
        return `El usuario ${this.nombre} ${this.apellido} tiene un ${this.mascotas} `
    }

    countMascotas() {
        console.log(`La cantidad de mascotas es ` + this.mascotas.length)
    }

    addBook(titulo, autorLibro) {
        this.libros.push({ nombre: titulo, autor: autorLibro })
    }

    getBookNames() {
        return this.libros.map(libro => (libro.nombre))
    }
}

let usuario1 = new Usuario('Pedro', 'Esquivel', [], []);
let usuario2 = new Usuario('Juan', 'Gutierrez', [], []);


console.log(usuario1.getFullName());
console.log(usuario1.addBook('El Poder del Ahora', 'Eckhart Tolle'))
console.log(usuario1.addMascota('gato'))
console.log(usuario1.addMascota('perro'))
console.log(usuario1.countMascotas())
console.log(usuario1.getBookNames())

console.log(usuario2.getFullName());
console.log(usuario2.addBook('Into the Wild', 'Jon Krakauer'))
console.log(usuario2.addMascota('perro'))
console.log(usuario2.addMascota('conejo'))
console.log(usuario2.addMascota('hamster'))
console.log(usuario2.countMascotas())
console.log(usuario2.getBookNames())

