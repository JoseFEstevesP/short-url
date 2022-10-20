const formidable = require('formidable');
const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');
const Use = require('./../models/User');

const formPerfil = async (req, res) => {
	try {
		const user = await Use.findById(req.user.id);
		return res.render('perfil', { user: req.user, imagen: user.imagen });
	} catch (error) {
		req.flash('mensajes', [{ msg: 'error al leer el usuario' }]);
		return res.redirect('/perfil');
	}
};
const editarFotoPerfil = async (req, res) => {
	const form = new formidable.IncomingForm();
	form.maxFileSize = 50 * 1024 * 1024;
	form.parse(req, async (err, fields, files) => {
		try {
			if (err) {
				throw new Error('fallo al subir la imagen');
			}
			const file = files.myFile;
			if (file.originalFilename === '') {
				throw new Error('no a seleccionado ninguna imagen');
			}
			const imageTypes = ['image/jpeg', 'image/png'];
			if (!imageTypes.includes(file.mimetype)) {
				throw new Error('el formato no es valido, formato valido .jpg y .png');
			}
			if (file.size > 50 * 1024 * 1024) {
				throw new Error(
					'la imagen excede el limite de tamaño, mínimo de tamaño 50mg'
				);
			}
			const extencion = file.mimetype.split('/')[1];
			const dirFile = path.join(
				__dirname,
				`../public/img/perfiles/${req.user.id}.${extencion}`
			);
			fs.renameSync(file.filepath, dirFile);
			const imagen = await Jimp.read(dirFile);
			imagen.resize(200, 200).quality(90).writeAsync(dirFile);
			const user = await Use.findById(req.user.id);
			user.imagen = `${req.user.id}.${extencion}`;
			await user.save();
			req.flash('mensajes', [{ msg: 'imagen subida' }]);
		} catch (error) {
			req.flash('mensajes', [{ msg: error.message }]);
		} finally {
			return res.redirect('/perfil');
		}
	});
};
module.exports = {
	formPerfil,
	editarFotoPerfil,
};
