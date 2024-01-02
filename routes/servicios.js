/*
    Rutas de Eventos
    host + /api/servicios
*/
const { Router } = require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const { all, add, update } = require('../controllers/servicios')

const router = Router()
router.use(validarJWT)

router.get('/', all)
router.post('/', add)
router.put('/:id', update)

module.exports = router