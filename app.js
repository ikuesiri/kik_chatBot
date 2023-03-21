const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
require("dotenv").config();
// initializing app
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors : {origin : "*" }}); // origin : '*' - enables all connections
//environmental variable configuration file
const CONFIG = require("./utils/env.config")
//import dataBase connection
const connectDB = require("./utils/connectDB");
//import session middleware
const sessionMiddleware = require("./config/sessionMiddleware");
//Chat model
const ChatModel = require("./model/chatModel");
//kik_bot responses
const {welcomeMessage, mainMenu, getSessionInfo, getMessage , getFoodMenu, checkOutOrder, getOrderHistory, getCurrentOrder, cancelOrder, saveOrder} = require("./utils/bot/botResponse");

const formatMessage = require("./utils/bot/format/formatMessage");
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


// set up  session middleware
app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);
//used to display static HTML files
app.use(express.static(path.join(__dirname, "public")));



	//to persist prev data/message
	const screenDisplay = {};

io.on("connection", async (socket) => {
	// get the session
	const sessionId = socket.request.session.id; 
	console.log(`Customer connected:${sessionId}`)
	getSessionInfo(sessionId);
	//connect users with the same session id
	socket.join(sessionId);

	welcomeMessage(io, sessionId);
	getMessage(io, sessionId);

	//listen for user message
	screenDisplay[sessionId] = 0;
	socket.on("Customers message", async (msg) => {
		let userInput = formatMessage("You", msg);
		const number = parseInt(msg);
		io.to(sessionId).emit("user message", userInput);

		let botOutput = "";
		switch (screenDisplay[sessionId]) {
			case 0:
				botOutput = await mainMenu(io, sessionId);
				screenDisplay[sessionId] = 1;
				break;
			case 1:
				if (number === 1) {
					botOutput = await getFoodMenu(io, sessionId);
					screenDisplay[sessionId] = 2;
					return;
				} else if (number === 99) {
					botOutput = await checkOutOrder(io, sessionId);
					screenDisplay[sessionId] = 1;
				} else if (number === 98) {
					botOutput = await getOrderHistory(io, sessionId);
					screenDisplay[sessionId] = 1;
				} else if (number === 97) {
					botOutput = await getCurrentOrder(io, sessionId);
				} else if (number === 0) {
					botOutput = await cancelOrder(io, sessionId);
				} else {
					botOutput = await formatMessage(
						"kik_bot",
						`<p>⚠ Invalid Selection:</p><br> <hr><p>Select 0 to 'cancel' and go back to the main menu.</p><br><p>Select 1 to go back to the food menu.</p>`
					);
					io.to(sessionId).emit("bot message", botOutput);
				}
				screenDisplay[sessionId] = 1;
				break;
			case 2:
				if (number <= 0 || number >= 8  ) {
					botOutput = await formatMessage(
						"kik_bot",
						`<p>⚠ Invalid Selection. Please Try again:</p><br><hr><p>Select 0 to 'cancel' and go back to the main menu.</p><br><p>Select 1 to go back to the food menu.</p>`
					);
					io.to(sessionId).emit("bot message", botOutput);
					screenDisplay[sessionId] = 1;
					return;
				} else {
					botOutput = await saveOrder(io, sessionId, number);
					screenDisplay[sessionId] = 1;
				}
				break;
		}
		const saveMessage = await new ChatModel({SSID: sessionId, userInput,
 botOutput
		});
		await saveMessage.save();
	});

	//Handle SessionId disconnection
	socket.on("disconnect", () =>{
		console.log(`Customer disconnected:${sessionId}`)
	})
});

//setting up the Database and server connections
const start = async() =>{
	try{
		await connectDB(CONFIG.MONGO_DB_URI)
		console.log('database connected')
		server.listen( process.env.PORT, () => {console.log(`Server listening at port:${process.env.PORT}`) })
  
	  }catch (error) {
		console.log('Unable to connect to the Database ' + error)
   }
  }

  //initialize Database and Server
  start();

