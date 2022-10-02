const Url = require('./../models/Url');
const uniqid = require('uniqid');
const leerUrl = async (req, res) => {
	try {
		const urls = await Url.find().lean();
		res.render('home', { urls });
	} catch (error) {
		console.log(error);
		res.send('fallo algo...');
	}
};
const andUrl = async (req, res) => {
	try {
		const { origin } = req.body;
		const url = new Url({ origin, shortUrl: uniqid() });
		await url.save();
		res.redirect('/');
	} catch (error) {
		console.error(error);
		res.send(error, 'error al tratar agregar');
	}
};
const deleteUrl = async (req, res) => {
	const { id } = req.params;
	try {
		await Url.findByIdAndDelete(id);
		res.redirect('/');
	} catch (error) {
		console.log(error);
		res.send('fallo algo...');
	}
};
const updateUrlForm = async (req, res) => {
	const { id } = req.params;
	try {
		const url = await Url.findById(id).lean();
		res.render('home', { url });
	} catch (error) {
		console.log(error);
		res.send('fallo algo...');
	}
};
const updateUrl = async (req, res) => {
	const { id } = req.params;
	const { origin } = req.body;
	try {
		await Url.findByIdAndUpdate(id, { origin });
		res.redirect('/');
	} catch (error) {
		console.log(error);
		res.send('fallo algo...');
	}
};
const redirect = async (req, res) => {
	const { shortUrl } = req.params;
	try {
		const url = await Url.findOne({ shortUrl });
		res.redirect(url.origin);
	} catch (error) {
		console.log(error);
		res.send('fallo algo...');
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
