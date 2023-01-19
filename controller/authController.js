const Use = require('./../models/User');
const uniqid = require('uniqid');
const { Error } = require('mongoose');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();
const registerForm = (req, res) => {
	return res.render('register');
};
const registerUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		req.flash('mensajes', errors.array());
		return res.redirect('/auth/register');
	}
	const { userName, email, pass } = req.body;
	try {
		let user = await Use.findOne({ email });
		if (user) throw new Error('el usuario ya esta registrado');
		user = new Use({ userName, email, pass, tokenConfirm: uniqid() });
		await user.save();
		const transport = nodemailer.createTransport({
			host: process.env.hostNameEmail,
			port: 465,
			secure: true,
			auth: {
				user: process.env.userEmail,
				pass: process.env.passEmail,
			},
		});
		await transport.sendMail({
			from: `verificar cuenta < ${process.env.userEmail} >`, // sender address
			to: user.email, // list of receivers
			subject: 'virificar cuenta', // Subject line
			html: `
			<b>Por favor verifique su cuenta</b>
			<a href="${process.env.PATHURL}/auth/confirmar/${user.tokenConfirm}">${user.userName}, verifica cuenta</a>
			`, // html body
		});
		req.flash('mensajes', [
			{ msg: 'revisa el correo elenctronico para confirmar cuenta' },
		]);
		return res.redirect('/auth/login');
	} catch (error) {
		req.flash('mensajes', [{ msg: error.message }]);
		return res.redirect('/auth/register');
	}
};
const confirmarCuenta = async (req, res) => {
	const { token } = req.params;
	try {
		const user = await Use.findOne({ tokenConfirm: token });
		if (!user) throw new Error('el usuario no existe');
		user.tokenConfirm = null;
		user.cuetaConfirmada = true;
		await user.save();
		req.flash('mensajes', [
			{ msg: 'cuenta verificada, puedes iniciar sessión' },
		]);
		return res.redirect('/auth/login');
	} catch (error) {
		req.flash('mensajes', [{ msg: error.message }]);
		return res.redirect('/auth/login');
	}
};
const loginForm = (req, res) => {
	return res.render('login');
};
// const argon2 = require('argon2');
const loginUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		req.flash('mensajes', errors.array());
		return res.redirect('/auth/login');
	}
	const { email, pass } = req.body;
	try {
		const user = await Use.findOne({ email });
		if (!user) throw new Error('usiaro no encontrado');
		if (!user.cuetaConfirmada) throw new Error('cuenta no validada');
		// if (!user.comparePassword(pass, user.pass))
		// throw new Error('clave no valida');
		if (pass !== user.pass) throw new Error('clave no valida');
		req.login(user, function (err) {
			if (err) throw new Error('Error al crear la sessión');
			return res.redirect('/');
		});
	} catch (error) {
		req.flash('mensajes', [{ msg: error.message }]);
		return res.redirect('/auth/login');
	}
};
const cerrarSession = (req, res) => {
	req.logout(err => {
		if (err) throw new Error('error al tratar de cerrar sessión.');
		return res.redirect('/auth/login');
	});
};
module.exports = {
	loginForm,
	registerForm,
	registerUser,
	confirmarCuenta,
	loginUser,
	cerrarSession,
};
