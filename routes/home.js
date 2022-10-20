const express = require('express');
const { formPerfil, editarFotoPerfil } = require('../controller/perfilController');
const verificarUsuario = require('../middlewares/verificarUsuario');
const {
	leerUrl,
	andUrl,
	deleteUrl,
	updateUrlForm,
	updateUrl,
	redirect,
} = require('./../controller/homeController');
const urlValidate = require('./../middlewares/urlValidate');
const router = express.Router();
router.get('/', verificarUsuario, leerUrl);
router.post('/', verificarUsuario, urlValidate, andUrl);
router.get('/eliminar/:id', verificarUsuario, deleteUrl);
router.get('/editar/:id', verificarUsuario, updateUrlForm);
router.post('/editar/:id', verificarUsuario, urlValidate, updateUrl);
router.get('/perfil',verificarUsuario, formPerfil);
router.post('/perfil',verificarUsuario, editarFotoPerfil);
router.get('/tets/:shortUrl', redirect);
module.exports = router;
