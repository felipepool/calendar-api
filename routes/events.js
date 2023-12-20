/*
    Rutas de Eventos
    host + /api/events
*/
const { Router } = require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const { all, add, update, remove } = require('../controllers/events')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')

const router = Router()
router.use(validarJWT)

router.get('/', all)

router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'El fecha de inicio es obligatorio').custom(isDate),
    check('end', 'El fecha de fin es obligatorio').custom(isDate),
    validarCampos
], add)

router.put('/:id', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'El fecha de inicio es obligatorio').custom(isDate),
    check('end', 'El fecha de fin es obligatorio').custom(isDate),
    validarCampos
], update)

router.delete('/:id', remove)

module.exports = router