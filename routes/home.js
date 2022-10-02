const express = require('express');
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
router.get('/', leerUrl);
router.post('/', urlValidate, andUrl);
router.get('/eliminar/:id', deleteUrl);
router.get('/editar/:id', updateUrlForm);
router.post('/editar/:id', urlValidate, updateUrl);
router.get('/:shortUrl', redirect);
module.exports = router;
