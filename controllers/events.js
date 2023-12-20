const { response } = require('express')
const Evento = require('../models/Evento')

const all = async (req, res = response) => {

    const eventos = await Evento.find({
        user: req.uid
    }).populate('user', 'name email')

    res.status(200).json({
        code: 0,
        eventos
    })

}

const add = async (req, res = response) => {

    try {
        const evento = new Evento(req.body)
        
        evento.user = req.uid
        const newEvent = await evento.save()
        
        res.status(201).json({
            code: 0,
            message: 'Agregar evento',
            evento: newEvent
        })
    } catch (error) {
        res.status(500).json({
            code: -1,
            message: error.message
        })
    }

}

const update = async (req, res = response) => {

    const eventoId = req.params.id
    const uid = req.uid

    try {
        const evento = await Evento.findById(eventoId)

        if( !evento ) {
            return res.status(400).json({
                code: -1,
                message: 'Evento no existe'
            })
        }
        
        if( evento.user.toString() !== uid ) {
            return res.status(400).json({
                code: -1,
                message: 'No puede editar el evento'
            })
        }

        const newEvento = { ...req.body, user: uid }

        const updatedEvent = await Evento.findByIdAndUpdate( eventoId, newEvento, { new: true });

        res.status(200).json({
            code: 0,
            evento: updatedEvent
        })
    } catch (error) {
        res.status(500).json({
            code: -1,
            message: error.message
        })
    }

}

const remove = async (req, res = response) => {

    const eventoId = req.params.id
    const uid = req.uid

    try {
        const evento = await Evento.findById(eventoId)

        if( !evento ) {
            return res.status(400).json({
                code: -1,
                message: 'Evento no existe'
            })
        }
        
        if( evento.user.toString() !== uid ) {
            return res.status(400).json({
                code: -1,
                message: 'No puede eliminar el evento'
            })
        }

        await Evento.findByIdAndDelete( eventoId );

        res.status(200).json({
            code: 0
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
    add,
    update,
    remove,
}