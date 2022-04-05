const express = require('express')
const autorizacionAdmin = require ('../Middleware/autorizacionAdmin')
const router = express.Router()

const {
    getProducts,
    searchProduct, 
    addProduct, 
    updateProduct, 
    deleteProduct
} = require('../controller/controllerProducto')


router.route('/')
    .get(getProducts)
    .post(autorizacionAdmin,addProduct)

router.route('/:id')
    .get(searchProduct)
    .put(autorizacionAdmin,updateProduct)
    .delete(autorizacionAdmin,deleteProduct)

module.exports = router