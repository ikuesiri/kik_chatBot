const session = require("express-session");
const CONFIG = require("../utils/env.config")
const MongoStore = require("connect-mongo");

const sessionMiddleware = session({
	secret: CONFIG.SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {		
		maxAge: 60 * 60 * 1000
	},
	store: MongoStore.create({ mongoUrl: CONFIG.MONGO_DB_URI }),
});

module.exports = sessionMiddleware;
