require("dotenv").config();

const CONFIG = {
	PORT: process.env.PORT,
	MONGO_DB_URI: process.env.MONGO_DB_URI,
	SECRET: process.env.SECRET
};

module.exports = CONFIG