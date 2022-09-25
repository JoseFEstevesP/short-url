const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
	const urls = [
		{ origin: 'www.google.com/jose1', shortUrl: 'sjhduehduhe' },
		{ origin: 'www.google.com/jose2', shortUrl: 'sjhduehduhe' },
		{ origin: 'www.google.com/jose3', shortUrl: 'sjhduehduhe' },
		{ origin: 'www.google.com/jose4', shortUrl: 'sjhduehduhe' },
	];
	res.render('home', { urls, style: './css/card.css' });
});
module.exports = router;
