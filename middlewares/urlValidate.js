const { URL } = require('url');
const urlValidate = (req, res, next) => {
	try {
		const { origin } = req.body;
		const urlFrontend = new URL(origin);
		if (urlFrontend.origin !== 'null') {
			return next();
		}
		throw new Error('tiene que contener https://');
	} catch (error) {
		if (error.message === 'Invalid URL') {
			req.flash('mensajes', [{ msg: 'tiene que contener https://' }]);
		} else {
			req.flash('mensajes', [{ msg: error.message }]);
		}
		return res.redirect('/');
	}
};
module.exports = urlValidate;
