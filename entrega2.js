let fs = require('fs');

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async writeFile(data) {
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));
        } catch (error) {
            console.log(`error: ${error}`)
            throw new Error(error)
        }
    }

    async getAll() {
        try {
            let productos = await fs.promises.readFile(this.archivo, 'utf8');
            return JSON.parse(productos)
        } catch (error) {
            console.log(`error: ${error}`)
            return []
        }
    }

    async save(obj) {
        let productos = await this.getAll()

        try {
            obj.id = productos.length === 0 ? 0 : productos[productos.length - 1].id + 1
            productos.push(obj)
            console.log(`se agregara el siguiente prod:  \n${JSON.stringify(obj)}`)
            await this.writeFile(productos)
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }

    async getById(id) {
        let productos = await this.getAll()
        try {
            const obj = productos.find(prod => prod.id === id)
            return obj ? obj : null;
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }

    async deleteById(id) {
        let productos = await this.getAll()
        try {
            productos = productos.filter(prod => prod.id != id)
            await this.writeFile(productos)
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteAll() {
        try {
            console.log('Se eliminaran todos los elementos')
            this.writeFile([])
            console.log('Elementos eliminados')
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = Contenedor;