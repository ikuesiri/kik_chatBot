const session  = require("express-session");
const CONFIG =  require("../config");
const MongoStore = require('connect-mongo');

const session_MW = session({
    secret: CONFIG.SESSION_SECRET,
    resave: false,
    // resave option basically saves the session data when the data is not modified
    // setting to true saves the data even when nothing is changed, (like a page reload for e.g)
    // setting to false prevents that.
    saveUninitialized: true,
    // setting to true ensures that a unique id is generated for a user that visits our website... & their activities can be recorded, 'false' means that no ID will be generated.
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
    // cookie: { secure: false }
    // cookie: { secure: false } // setting to true means the setting will work with https Only, (but in the project I am also using 'localhost')
    store: MongoStore.create({ mongoUrl: CONFIG.MONGO_DB_URI })
    // a package to store session in mongoDB, to make the session persistence,this way, restarting the server with not end/restart the session
  })

module.exports = session_MW