const Products = require("../models/producto")


const productos = new Products()

module.exports = {
    
    getProducts: (req, res) => {
        try {
            res.status(200).json(productos.productsAll) 
        }catch(e){
            res.status(500).json(e.message) 
        }
    },

    searchProduct:(req, res) => {
        try {
            const idProduct = Number(req.params.id)
            if(!idProduct) {
                return res.status(404).json({
                    descripcion:{
                        ruta: `${process.env.RUTA}${req.originalUrl}`,
                        metodo: req.method,
                        mensaje: "No Implementada",
                        error: "404"
                    }
                })
            }
            const producto = productos.getProductById(idProduct)
            if(producto){
                return res.status(200).json(producto)
            }else{ 
                return res.status(200).json({error: "Producto No Encontrado"})
            } 
            
        }catch(e){
            res.status(500).json(e.message)
        }
    },

    addProduct: (req, res) => {
        try {
            if(req.body.nombre && req.body.descripcion && req.body.codigo && req.body.foto && req.body.precio && req.body.stock){
                productos.saveProduct(req.body)
            }else{
                res.status(400).json({error: "Falta campos que completar"})  
            }
            res.status(201).json(productos.productsAll) 
        }catch(e){
            res.status(500).json(e.message)
        }
    },

    updateProduct: (req, res) => {
        try {
            const id = Number(req.params.id)
            const productoActualizado = productos.update(id, req.body)
            res.status(201).json(productoActualizado) 
        }catch(e){
            res.status(`No se pudo actualizar el producto ${e.message}`)
        }
        
    },

    deleteProduct: (req, res) => {
        try {
            const id = Number(req.params.id);
            const productoElimnado = productos.deleteById(id);
            if(productoElimnado){
                res.status(200).json({message: `El producto con id: ${id} fue eliminado correctamente`})
            }else {
                res.status(500).json({message: `El producto con id: ${id} no se encontro`})
            }
        }catch(e){
            res.status(500).json({error: `No se pudo borrar el producto ${e.message}`})
        }
    }
}