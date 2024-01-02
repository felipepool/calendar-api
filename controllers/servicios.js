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

const update = async (req, res = response) => {

    const servicioId = req.params.id
    const uid = req.uid

    try {
        const servicio = await Servicio.findById(servicioId, {
            user: uid
        })

        if( !servicio ) {
            return res.status(400).json({
                code: -1,
                message: 'Servicio no existe'
            })
        }

        const newServicio = { ...req.body, user: uid }

        const updatedServicio = await Servicio.findByIdAndUpdate( servicioId, newServicio, { new: true });

        res.status(200).json({
            code: 0,
            evento: updatedServicio
        })
    } catch (error) {
        res.status(500).json({
            code: -1,
            message: error.message
        })
    }

}

const remove = async (req, res = response) => {

    const servicioId = req.params.id
    const uid = req.uid

    try {
        const servicio = await Servicio.findById(servicioId, {
            user: uid
        })

        if( !servicio ) {
            return res.status(400).json({
                code: -1,
                message: 'Servicio no existe'
            })
        }

        await Servicio.findByIdAndDelete( servicioId );

        res.status(200).json({
            code: 0
        })
    } catch (error) {
        
    }
}

module.exports = {
    all,
    add,
    update,
    remove
}