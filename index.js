const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const { create } = require('express-handlebars');
const User = require('./models/User');
const csrf = require('csurf');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();
const clientDB = require('./database/db');
const cors = require('cors');
const app = express();
const corsOptions = {
	credentials: true,
	origin: process.env.PATHURL || '*',
	methods: ['GET', 'POST'],
};
app.use(cors(corsOptions));
app.set('trust proxy', 1);
app.use(
	session({
		secret: process.env.SECRETSESSION,
		resave: false,
		saveUninitialized: false,
		name: 'session-user',
		store: MongoStore.create({
			clientPromise: clientDB,
			dbName: process.env.DBNAME,
		}),
		cookie: {
			secure: process.env.MODO === 'production',
			maxAge: 30 * 24 * 60 * 60 * 1000,
		},
	})
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) =>
	done(null, { id: user._id, userName: user.userName })
);
passport.deserializeUser(async (user, done) => {
	await User.findById(user.id);
	return done(null, user);
});
const hbs = create({
	extname: '.hbs',
	partialsDir: ['views/components'],
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(csrf());
app.use(mongoSanitize());
app.use((req, res, next) => {
	res.locals.csrfToken = req.csrfToken();
	res.locals.mensajes = req.flash('mensajes');
	next();
});
app.use('/', require('./routes/home'));
app.use('/auth', require('./routes/auth'));
app.use(express.static(__dirname + '/public'));
const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => console.log(process.env.PATHURL));
