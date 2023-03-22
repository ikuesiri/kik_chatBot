const session = require("express-session");
const CONFIG = require("../utils/env.config")
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
	 uri : CONFIG.MONGO_DB_URI,
	collection : "session"
});
// Catch errors
store.on("error", function (error) {
	console.log(error);
  });

const sessionMiddleware = session({
	secret: CONFIG.SECRET,
	resave: false,
	saveUninitialized: true,
	store,
	cookie: {		
		maxAge: 60 * 60 * 1000
	},
});

module.exports = sessionMiddleware;
