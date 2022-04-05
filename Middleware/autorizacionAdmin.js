let admin = false

const autorizacionAdmin = (req, res, next) => {
    if (admin) {
        next()
    }else {
        res.status(401).json({
            descripcion:{
                            ruta: `${process.env.RUTA}${req.originalUrl}`,
                            metodo: req.method,
                            mensaje: "No esta Autorizado",
                            error: "401",
                            admin: "false"
                        }
        });
    }
}

module.exports = autorizacionAdmin
