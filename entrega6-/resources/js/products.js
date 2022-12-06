let fs = require("fs")

class Container {
    constructor(file) {
        this.file = file

    }
    // write the file first and stringify to become string 
    async writeFile(data) {
        try {                                                        // 2 empty spaces   
            await fs.promises.writeFile(this.file, JSON.stringify(data, null, 2));

        } catch (error) {
            console.log(`error: ${error}`)
            throw new Error(error)

        }
    }
    // we get all the products reading the file ("products.js")
    async getAll() {
        try {
            let products = await fs.promises.readFile(this.file, 'utf-8')
            // parse to become object
            return JSON.parse(products)

        } catch (error) {
            console.log(`error: ${error}`)
            return []

        }
    }

    async save(object) {
        // we get all the products first
        let products = await this.getAll()
        object.id = parseInt(object.id);
        object.price = parseInt(object.price)

        try {
            //push the new obj and assingn new id
            object.id = products.length === 0 ? 0 : products[products.length - 1].id + 1
            products.push(object)
            // save as a string
            console.log(`the next element will be added : \n${JSON.stringify(object)}`)

            //rewrite de file with the new product that was pushed 
            await this.writeFile(products)

            console.log('saved succesfully')
        } catch (error) {
            console.log(`error: ${error}`)

        }
    }

    async update(object, id) {
        let productos = await this.getAll()
        let prod_index = productos.map(el => el.id).indexOf(id)
        if (prod_index >= 0) {
            const prevProd = productos[prod_index]
            object.id = productos[prod_index].id
            productos[prod_index] = object

            try {
                await this.writeFile(productos)
                return [object, prevProd]
            } catch (error) {
                console.log(`error: ${error}`)
            }
        }
    }

    async getById(id) {
        let products = await this.getAll()
        try {
            //find product with same id
            const obj = products.find(products => products.id == id)
            return obj ? obj : null;
        } catch (error) {
            console.log(`error: ${error}`)
        }

    }

    async deleteById(id) {
        let products = await this.getAll()
        let prodRemoved = await this.getById()
        try {
            // filter products differents that my id 
            products = products.filter(products => products.id != id)
            // rewrite products 
            await this.writeFile(products, prodRemoved)
        } catch (error) {
            throw new Error(error)

        }

    }
    async deleteAll() {
        try {
            console.log('We will delete all the elements')
            //rewrite a new file without elements
            this.writeFile([])
            console.log('Elements deleted')

        } catch (error) {
            throw new Error(error)

        }

    }
}

module.exports = Container;