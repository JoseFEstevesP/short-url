const { URL } = require('url');
const urlValidate = (req, res, next) => {
	try {
		const { origin } = req.body;
		const urlFrontend = new URL(origin);
		if (urlFrontend.origin !== 'null') {
			return next();
		} else {
			throw new Error('no es una url valida 🤦‍♀️');
		}
	} catch (error) {
		return res.send('url no valida');
	}
};
module.exports = urlValidate;
