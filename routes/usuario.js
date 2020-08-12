const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


const { getUsuarios, crearUsuarios, actualizarUsuarios, borrarUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/', validarJWT, getUsuarios);
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo electronico es obligatorio').not().isEmail(),
        validarCampos,
    ],
    crearUsuarios
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'La correo es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuarios
);

router.delete('/:id', [

    ],
    validarJWT,
    borrarUsuarios
);

module.exports = router;