require('dotenv').config()

const CONFIG = {
  PORT: process.env.PORT,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  SESSION_SECRET: process.env.SESSION_SECRET
}

module.exports = CONFIG
