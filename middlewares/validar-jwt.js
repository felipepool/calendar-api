const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = ( req = request, res = response, next ) => {
    // x-token headers
    const token = req.header('x-token')

    if( !token ) {
        return res.status(401).json({
            code: -1,
            message: 'Se necesita un token valido'
        })
    }

    try {
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED )

        req.uid = uid
        req.name = name

    } catch (error) {
        return res.status(401).json({
            code: -1,
            message: `Token no valido - ${error.message}`
        })
    }

    next()
}

module.exports = {
    validarJWT
}