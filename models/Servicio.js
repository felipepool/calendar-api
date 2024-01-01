const { Schema, model } = require('mongoose')

const ServicioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

}, {
    collection: 'servicios'
})

ServicioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Servicio', ServicioSchema)