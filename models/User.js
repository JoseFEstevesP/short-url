const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
const userSchema = new Schema({
	userName: {
		type: String,
		lowercase: true,
		required: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
		index: { unique: true },
	},
	pass: {
		type: String,
		lowercase: true,
		required: true,
	},
	tokenConfirm: {
		type: String,
		default: null,
	},
	cuetaConfirmada: {
		type: Boolean,
		default: false,
	},
	imagen: {
		type: String,
		default: null,
	},
});
// const argon2 = require('argon2');
// userSchema.pre('save', async function (next) {
// 	const user = this;
// 	if (!user.isModified('pass')) return next();
// 	try {
// 		const hash = await argon2.hash(user.pass,{hashLength:10});
// 		user.pass = hash;
// 		next();
// 	} catch (error) {
// 		console.error(error);
// 		next();
// 	}
// });
// userSchema.methods.comparePassword = function ({pass,hash}) {
// return argon2.verify(hash, pass);
// };
module.exports = mongoose.model('user', userSchema);
