const { Schema, model } = require('mongoose')

const ReservaSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    profesional: {
        type: Schema.Types.ObjectId,
        ref: 'Profesional',
        required: true
    },
    servicio: {
        type: Schema.Types.ObjectId,
        ref: 'Servicio',
        required: true
    }

}, {
    collection: 'reservas'
})

ReservaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Reserva', ReservaSchema)