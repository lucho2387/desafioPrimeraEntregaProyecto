const res = require('express/lib/response')
const fs = require('fs')

class Productos{

    constructor(timestamp, nombre, descripcion, codigo, foto, precio, stock){
        this.id = 0
        this.timestamp = timestamp
        this.nombre = nombre
        this.descripcion = descripcion
        this.codigo = codigo
        this.foto = foto
        this.precio = precio
        this.stock = stock
    } 
    
    get productsAll() {
        try{
            const json_productos = fs.readFileSync("./data/productos.json", 'utf-8')
            let productos = JSON.parse(json_productos)
            return productos;
        }catch(e){
            throw new Error(`Se produjo un error: ${e.message}`);
        }
    }

    saveProduct(producto){
        const json_productos = fs.readFileSync("./data/productos.json", 'utf-8')
        let productos = JSON.parse(json_productos)
        
        let timestamp = Date.now()
        try{
                if(productos.length === 0){
                    this.id ++
                    const nuevoProducto = {
                        id: this.id,
                        timestamp:  timestamp,
                        nombre: producto.nombre,
                        descripcion: producto.descripcion,
                        codigo: producto.codigo,
                        foto: producto.foto,
                        precio: producto.precio,
                        stock: producto.stock
                    };
                    productos.push(nuevoProducto)
                    const json_productos = JSON.stringify(productos)
                    fs.writeFileSync('./data/productos.json', json_productos, 'utf-8')
                    return nuevoProducto
                }else {
                    this.id = productos.length + 1
                    const nuevoProducto = {
                        id: this.id,
                        timestamp: timestamp,
                        nombre: producto.nombre,
                        descripcion: producto.descripcion,
                        codigo: producto.codigo,
                        foto: producto.foto,
                        precio: producto.precio,
                        stock: producto.stock
                    };
                    productos.push(nuevoProducto)
                    const json_productos = JSON.stringify(productos)
                    fs.writeFileSync('./data/productos.json', json_productos, 'utf-8')
                    return nuevoProducto
                }
                
            
        }catch(e){
            throw new Error(`No se pudo guardar el producto: ${e.message}`)
        }
    }

    getProductById(idProduct){
        try {
            const json_productos = fs.readFileSync("./data/productos.json", 'utf-8')
            let productos = JSON.parse(json_productos)
            return productos.find(product => product.id == idProduct);
        }catch(e) {
            throw new Error(`No se encontro el Producto`);
        }
    }

    update(id, body){
        const json_productos = fs.readFileSync("./data/productos.json", 'utf-8')
        let productos = JSON.parse(json_productos)

        const actualizarProducto = {
            id: id,
            nombre: body.nombre,
            descripcion: body.descripcion,
            codigo: body.codigo,
            foto: body.foto,
            precio: body.precio,
            stock: body.stock
        };
        const updateIndex = productos.findIndex((producto) => producto.id == id);
        if(updateIndex === -1){
            return `El producto con id: ${id} no se encontro`
        }else {
            productos[updateIndex] = actualizarProducto;
            const json_productos1 = JSON.stringify(productos)
            fs.writeFileSync('./data/productos.json', json_productos1, 'utf-8')
            return actualizarProducto;
        }
    }

    deleteById(id) {
        try {
            const json_productos = fs.readFileSync("./data/productos.json", 'utf-8')
            let productos = JSON.parse(json_productos)
            const deleteIndex = productos.findIndex((product) => product.id === id);
            if (deleteIndex === -1 ){
                console.log("Id no encontrado");
            } else{
                const deleteData = productos.splice(deleteIndex,1);
                const json_productos = JSON.stringify(productos)
                fs.writeFileSync('./data/productos.json', json_productos, 'utf-8')
                return deleteData
            }
            } catch (error) {
            console.log("Error " + error);
        }
    }
}

module.exports = Productos;


