const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body

    try {
        let usuario = await Usuario.findOne({ email })

        if( usuario ) {
            return res.status(400).json({
                code: -1,
                message: 'El email ya esta registrado'
            });
        }

        usuario = new Usuario(req.body)

        // Encriptar contrasena
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync( password, salt )

        usuario.save()

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name )

        res.status(201).json({
            code: 0,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            code: -1,
            message: error.message
        })
    }

}

const loginUsuario = async (req, res) => {

    const { email, password } = req.body

    try {
        let usuario = await Usuario.findOne({ email })

        if( !usuario ) {
            return res.status(400).json({
                code: -1,
                message: 'El email no esta registrado'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password )

        if( !validPassword ) {
            return res.status(400).json({
                code: -1,
                message: 'El password es incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name )

        res.status(200).json({
            code: 0,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            code: -1,
            message: error.message
        })
    }
}

const revalidarToken = async (req, res) => {

    const { uid, name } = req

    // Generar JWT
    const token = await generarJWT( uid, name )

    res.json({
        code: 0,
        uid,
        name,
        token
    })

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}