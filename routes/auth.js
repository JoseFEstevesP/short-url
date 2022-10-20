const express = require('express');
const { body } = require('express-validator');
const {
	loginForm,
	registerForm,
	registerUser,
	confirmarCuenta,
	loginUser,
	cerrarSession,
} = require('../controller/authController');
const router = express.Router();
router.get('/register', registerForm);
router.post(
	'/register',
	[
		body('userName', 'ingrese un usuario valido').trim().notEmpty().escape(),
		body('email', 'ingrese un correo valido').trim().isEmail().normalizeEmail(),
		body('pass', 'contraseña minmo 6 caracteres')
			.trim()
			.escape()
			.isLength({ min: 6 })
			.custom((value, { req }) => {
				if (value !== req.body.pass2) {
					throw new Error('no coninciden las contraseñas');
				}
				return value;
			}),
	],
	registerUser
);
router.get('/confirmar/:token', confirmarCuenta);
router.get('/login', loginForm);
router.post(
	'/login',
	[
		body('email', 'ingrese un correo valido').trim().isEmail().normalizeEmail(),
		body('pass', 'contraseña minmo 6 caracteres')
			.trim()
			.escape()
			.isLength({ min: 6 }),
	],
	loginUser
);
router.get('/logout', cerrarSession);
module.exports = router;
