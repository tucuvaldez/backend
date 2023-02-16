import { checkLength, getTimestamp, checkId, checkLength, newId } from '../utilities/utilities';

export default class Cart extends Container{
    constructor(getFoo, delFoo, saveFoo){
        this.getFoo() = getFoo,
        this.delFoo() = delFoo,
        this.saveFoo() = saveFoo
    }
    async newCart(){
        let products = [];
        let timestamp = getTimestamp();
        let carts = await this.getFoo();
        let id = 1
        if(carts.length > 0){
            id = newId(carts);
        }
        this.saveCart({id, timestamp, products})
        return {id, timestamp, products}
        
    }
    async saveCart(cart){
        let carts = await this.getFoo();
        carts.push(cart)
        try {
            this.saveFoo(carts)
        } catch (error) {
            console.log(error)
        }
    }
    async updateCart(cart){
        let carts = await this.getFoo()
        let index = carts.map(element => element.id).indexOf(cart.id)
        if(index >= 0){
            carts.splice(index, 1)
            console.log(cart)
            carts.push(cart)
            await this.saveFoo(carts)
            return true
        }
        return false

    }
    async addToCart(cartId, product){
        let cart = await this.getById(cartId)
        cart.push(product)
        await this.updateCart(cart)
    }
    async deleteCartProduct(cartId, productId){
        let cart = await this.getById(cartId)
        try {
            if(cart === null){
                throw new Error('Id de carrito no encontrado')
            }
            let newCart = cart.filter(element => element.id =! productId)
            await this.saveCart(newCart)
        } catch (error) {
            console.log('Error de escritura')
            console.log(error)
        }
    }
}