const { response } = require('express')
const Servicio = require('../models/Servicio')

const all = async (req, res = response) => {

    const servicios = await Servicio.find({
        user: req.uid
    }).populate('user', 'name email')

    res.status(200).json({
        code: 0,
        servicios
    })

}

const add = async (req, res = response) => {

    try {
        const servicio = new Servicio(req.body)
        
        servicio.user = req.uid
        const newServicio = await servicio.save()
        
        res.status(201).json({
            code: 0,
            servicios: newServicio
        })
    } catch (error) {
        res.status(500).json({
            code: -1,
            message: error.message
        })
    }

}

module.exports = {
    all,
    add
}