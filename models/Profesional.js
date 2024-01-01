const { Schema, model } = require('mongoose')

const ProfesionalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

}, {
    collection: 'profesionales'
})

ProfesionalSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Profesional', ProfesionalSchema)