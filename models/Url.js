const mongoose = require('mongoose');
const { Schema } = mongoose;
const urlSchema = new Schema({
	origin: {
		type: String,
		required: true,
	},
	shortUrl: {
		type: String,
		required: true,
	},
});
const Url = mongoose.model('urls', urlSchema);
module.exports = Url;
