const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

// Configuracion
app.set('json space', 4)
require('dotenv').config()
const PORT = process.env.PORT || 8080

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



// Routes
app.use('/api/productos', require('./route/rutaProducto'))
app.use('/api/carrito', require('./route/rutaCarrito'))
app.use((req, res, next) => {
    res.status(404)
    res.send({
        descripcion:{
            ruta: `${process.env.RUTA}${req.originalUrl}`,
            metodo: req.method,
            mensaje: "No Implementada",
            error: "404"
        }
    })
})
//Static Files
app.use(express.static("public"));


// Inicio del Servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))