/*
    Rutas de Eventos
    host + /api/servicios
*/
const { Router } = require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const { all, add } = require('../controllers/servicios')

const router = Router()
router.use(validarJWT)

router.get('/', all)
router.post('/', add)

module.exports = router