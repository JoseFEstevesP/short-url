const { validationResult } = require('express-validator');
const Url = require('./../models/Url');
const uniqid = require('uniqid');
const leerUrl = async (req, res) => {
	try {
		const urls = await Url.find({ user: req.user.id }).lean();
		res.render('home', { urls });
	} catch (error) {
		req.flash('mensajes', [{ msg: error.message }]);
		return res.redirect('/');
	}
};
const andUrl = async (req, res) => {
	try {
		const { origin } = req.body;
		const url = new Url({ origin, shortUrl: uniqid(), user: req.user.id });
		await url.save();
		return res.redirect('/');
	} catch (error) {
		req.flash('mensajes', [{ msg: error.message }]);
		return res.redirect('/');
	}
};
const deleteUrl = async (req, res) => {
	const { id } = req.params;
	try {
		const url = await Url.findById(id);
		if (!url.user.equals(req.user.id))
			throw new Error('esta url no te pertenece verifique');
		await url.remove();
		res.redirect('/');
	} catch (error) {
		req.flash('mensajes', [{ msg: error.message }]);
		return res.redirect('/');
	}
};
const updateUrlForm = async (req, res) => {
	const { id } = req.params;
	try {
		const url = await Url.findById(id).lean();
		if (!url.user.equals(req.user.id))
			throw new Error('esta url no te pertenece verifique');
		res.render('home', { url });
	} catch (error) {
		req.flash('mensajes', [{ msg: error.message }]);
		return res.redirect('/');
	}
};
const updateUrl = async (req, res) => {
	const { id } = req.params;
	const { origin } = req.body;
	try {
		const url = await Url.findById(id);
		if (!url.user.equals(req.user.id))
			throw new Error('esta url no te pertenece verifique');
		await url.updateOne({ origin });
		return res.redirect('/');
	} catch (error) {
		req.flash('mensajes', [{ msg: error.message }]);
		return res.redirect('/');
	}
};
const redirect = async (req, res) => {
	const { shortUrl } = req.params;
	try {
		const urlDB = await Url.findOne({ shortUrl: shortUrl });
		res.redirect(urlDB.origin);
	} catch (error) {
		req.flash('mensajes', [{ msg: error.message }]);
		return res.redirect('/auht/login');
	}
};
module.exports = {
	leerUrl,
	andUrl,
	deleteUrl,
	updateUrlForm,
	updateUrl,
	redirect,
};
