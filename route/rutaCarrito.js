const express = require('express')
const autorizacionAdmin = require ('../Middleware/autorizacionAdmin')
const router = express.Router()

const {
    getCarts,
    addCart,
    addProductCart,
    searchCart,
    deleteCart,
    deleteProductCart
} = require('../controller/controllerCarrito')


router.route('/')
    .get(getCarts)
    .post(addCart)


router.route('/:id')
    .delete(autorizacionAdmin,deleteCart)
    

router.route('/:id/productos')
        .get(searchCart)
        .post(addProductCart)

router.route('/:idCart/productos/:idProduct')
        .delete(autorizacionAdmin,deleteProductCart)

module.exports = router