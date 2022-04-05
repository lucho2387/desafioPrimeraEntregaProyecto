const Carrito = require("../models/carrito")

const carrito = new Carrito()

module.exports = {
    
    getCarts: (req, res) => {
        try {
            res.status(200).json(carrito.cartsAll) 
        }catch(e){
            res.status(500).json(e.message) 
        }
    },

    addCart: (req, res) => {
        try {
            carrito.saveCart(req.body)
            res.status(201).json(`El id del carrito que se creo es: ${carrito.id}`) 
        }catch(e){
            res.status(500).json(e.message)
        }
    },

    deleteCart: (req, res) => {
        try {
            const id = Number(req.params.id);
            const carritoElimnado = carrito.deleteById(id);
            if(carritoElimnado){
                res.status(200).json({message: `El carrito con id: ${id} fue eliminado correctamente`})
            }else {
                res.status(500).json({message: `El carrito con id: ${id} no se encontro`})
            }
        }catch(e){
            res.status(500).json({error: `No se pudo borrar el carrito ${e.message}`})
        }
    },

    addProductCart: (req, res) => {
        try {
            const id = Number(req.params.id)
            const resultado =  carrito.saveProductCart(id,req.body);
            res.status(200).json(resultado);
        }catch(e){
            res.status(500).json(e.message)
        }
    },

    searchCart:(req, res) => {
        try {
            const cart = carrito.getCartById(Number(req.params.id))
            if(cart){
                return res.status(200).json(cart)
            }else {
                return res.status(200).json({error: "Carrito No Encontrado"})
            } 
            
        }catch(e){
            res.status(500).json(e.message)
        }
    },

    deleteProductCart: (req, res) => {
        try {
            const idCart = Number(req.params.idCart)
            const idProduct = Number(req.params.idProduct);
            const productoCarritoElimnado = carrito.deleteProductById(idCart,idProduct);

            res.json(productoCarritoElimnado)
            
        }catch(e){
            res.status(500).json({error: `No se pudo borrar el producto del carrito ${e.message}`})
        }
    },
}