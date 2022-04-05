const fs = require('fs')

class Carrito{
    
    constructor(timestamp, productos){
        this.id = 0
        this.timestamp = timestamp
        this.productos = productos
    }  

    get cartsAll() {
        try{
            const json_carrito = fs.readFileSync("./data/carrito.json", 'utf-8')
            let carrito = JSON.parse(json_carrito)
            return carrito;
        }catch(e){
            throw new Error(`Se produjo un error: ${e.message}`);
        }
    }

    saveCart(){
        let timestamp = Date.now()
        try{
            const json_carrito = fs.readFileSync("./data/carrito.json", 'utf-8')
            let carrito = JSON.parse(json_carrito)

                if(carrito.length === 0){
                    this.id ++
                    const nuevoCarrito = {
                        id: this.id,
                        timestamp: timestamp,
                        productos: []
                    };
                    carrito.push(nuevoCarrito)
                    const json_carrito = JSON.stringify(carrito)
                    fs.writeFileSync('./data/carrito.json', json_carrito, 'utf-8')
                    return nuevoCarrito;
                }else {
                    this.id = carrito.length + 1
                    
                    const nuevoCarrito = {
                        id: this.id,
                        timestamp: timestamp,
                        producto: []
                    };
                    carrito.push(nuevoCarrito)
                    const json_carrito = JSON.stringify(carrito)
                    fs.writeFileSync('./data/carrito.json', json_carrito, 'utf-8')
                    return nuevoCarrito;
                }
                
            
        }catch(e){
            throw new Error(`No se pudo guardar el carrito: ${e.message}`)
        }
    }

    deleteById(id) {
        try {
            const json_carrito = fs.readFileSync("./data/carrito.json", 'utf-8')
            let carrito = JSON.parse(json_carrito)
            const deleteIndex = carrito.findIndex((cart) => cart.id === id);
            if (deleteIndex === -1 ){
                console.log("Id no encontrado");
            } else{
                const deleteData = carrito.splice(deleteIndex,1)
                const json_carrito = JSON.stringify(carrito)
                fs.writeFileSync('./data/carrito.json', json_carrito, 'utf-8')
                return deleteData
            }
            } catch (error) {
            console.log("Error " + error);
        }
    }

    saveProductCart(id){
        try{   
            const json_productos = fs.readFileSync("./data/productos.json", 'utf-8')
            let productos = JSON.parse(json_productos)
            const json_carrito = fs.readFileSync("./data/carrito.json", 'utf-8')
            let carrito = JSON.parse(json_carrito)

            const idProducto = productos.find((cart) => cart.id === id);
            const cartIndex = productos.findIndex((cart) => cart.id === id);
            if (cartIndex === -1) {
                return ("El producto no existe");
            }else {
                let timestamp = Date.now()
                if(carrito.length === 0){
                    this.id ++
                    let actualizarProducto = {
                        id: this.id,
                        timestamp: timestamp, 
                        producto: [{
                            id: idProducto.id,
                            timestamp:  timestamp,
                            nombre: idProducto.nombre,
                            descripcion: idProducto.descripcion,
                            codigo: idProducto.codigo,
                            foto: idProducto.foto,
                            precio: idProducto.precio,
                            stock: idProducto.stock}
                        ]
                        
                    };
                    carrito.push(actualizarProducto)
                    const json_carrito = JSON.stringify(carrito)
                    fs.writeFileSync('./data/carrito.json', json_carrito, 'utf-8')
                    return actualizarProducto;
                }else {
                    this.id = carrito.length + 1
                    let actualizarProducto = {
                        id: this.id,
                        timestamp: timestamp, 
                        producto: [{
                            id: idProducto.id,
                            timestamp:  timestamp,
                            nombre: idProducto.nombre,
                            descripcion: idProducto.descripcion,
                            codigo: idProducto.codigo,
                            foto: idProducto.foto,
                            precio: idProducto.precio,
                            stock: idProducto.stock}
                        ]
                        
                    };
                    carrito.push(actualizarProducto)
                    const json_carrito = JSON.stringify(carrito)
                    fs.writeFileSync('./data/carrito.json', json_carrito, 'utf-8')
                    return actualizarProducto;
                }    
            }
            
        }catch(e){
            throw new Error(`No se pudo guardar el producto en el carrito: ${e.message}`)
        }
    }
    

    getCartById(idCart){
        try {
            const json_carrito = fs.readFileSync("./data/carrito.json", 'utf-8')
            let carrito = JSON.parse(json_carrito)
            return carrito.find(cart => cart.id == idCart);
        }catch(e) {
            throw new Error(`No se encontro el Carrito`);
        }
    }

    deleteProductById(idCart, idProduct) {
        try {
            const json_carrito = fs.readFileSync("./data/carrito.json", 'utf-8')
            let carrito = JSON.parse(json_carrito)
            const cartIndex = carrito.findIndex((cart) => cart.id === idCart);

            if (cartIndex === -1) {
                return `El carrito con id: ${idCart} no existe`
            }else {
                    const deleteIndex = carrito[cartIndex].producto.findIndex((producto) => producto.id === idProduct);
                    if(deleteIndex !== -1){
                        carrito[cartIndex].producto.splice(deleteIndex,1);
                        const json_carrito = JSON.stringify(carrito)
                        fs.writeFileSync('./data/carrito.json', json_carrito, 'utf-8')
                        return `El carrito con  id: ${idCart} con el producto con id: ${idProduct} fue eliminado correctamente`
                    }else{
                        return `El producto con id: ${idProduct} no se encontro`
                    }
                }     
            } catch (error) {
            console.log("Error " + error);
        }
    }
}

module.exports = Carrito;