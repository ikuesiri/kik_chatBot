const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
	{
		SSID: {
			type: String,
			required: true
		},
		userInput: {
			name: String,
			text: String,
			time: String,
		},
		botOutput: {
			name: String,
			text: String,
			time: String
		},
	},
	{ timestamps: true }
);
const ChatModel  = mongoose.model("Message",  chatSchema); 
module.exports  = ChatModel;
