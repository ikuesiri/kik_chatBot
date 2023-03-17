const express = require("express")
const messageRoute = express.Router()
const chat = require("../controller/chat")

messageRoute.get("/", chat );
module.exports = messageRoute;