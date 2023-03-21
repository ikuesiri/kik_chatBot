const OrderModel = require("../../model/orderModel");
const ChatModel = require("../../model/chatModel");
const {mainMenu, foodMenu } = require("../menuSection");
const formatMessage = require("./format/formatMessage");
const formatMenu = require("./format/formatMenu");


exports.welcomeMessage = (io, SSID) => {
	io.to(SSID).emit(
		"bot message",
		formatMessage("kik_bot", "Hello!  Customer,  I'm kiki the friendly bot <br> Kindly Enter tell me your name, So I can help with your Order")
	);
};

exports.mainMenu = (io, SSID) => {
	let botOutput = formatMessage("kik_bot", formatMenu("mainMenu",mainMenu));
	io.to(SSID).emit("bot message", botOutput);
	return botOutput;
};


exports.getFoodMenu = (io, SSID) => {
	let botOutput = formatMessage(
		"kik_bot",
		formatMenu("Select a number to Select your Item", foodMenu)
	);
	io.to(SSID).emit("bot message", botOutput);
	return botOutput;
};

exports.checkOutOrder = async (io, SSID) => {
	const order = await OrderModel.findOne({ SSID });

	let botOutput = "";
	if (order.currentOrder.length < 1) {
		botOutput = formatMessage(
			"kik_bot",
			"Empty❗ No Order "
		);
		io.to(SSID).emit("bot message", botOutput);
	} else {
		//using discontruction es6 method to populate placeOrder
		order.placedOrder = [
			...order.currentOrder,
			...order.placedOrder,
		];
		order.currentOrder = [];
		await order.save();

		botOutput = formatMessage("kik_bot", "Order Placed: Successfully ☑");

		io.to(SSID).emit("bot message", botOutput);
	}
	io.to(SSID).emit("bot message", formatMessage("kik_bot", mainMenu));

	return botOutput;
};

//save Order
exports.saveOrder = async (io, SSID, number) => {
	const order = await OrderModel.findOne({ SSID });

	let botOutput = "";

	if(!order) return botOutput = formatMessage("kik_bot", "Your session has not began");

	if (number === 1) {
		order.currentOrder.push(foodMenu[0]);
	}
	if (number === 2) {
		order.currentOrder.push(foodMenu[1]);
	}
	if (number === 3) {
		order.currentOrder.push(foodMenu[2]);

	}
	if (number === 4) {
		order.currentOrder.push(foodMenu[3]);

	}
	if (number === 5) {
		order.currentOrder.push(foodMenu[4]);
	}
	if (number === 6) {
		order.currentOrder.push(foodMenu[5]);
	}
	if (number === 7) {
		order.currentOrder.push(foodMenu[6]);
	}

	await order.save();

	botOutput = formatMessage(
		"kik_bot",
		formatMenu("Order Added", order.currentOrder)
	);
	io.to(SSID).emit("bot message", botOutput);

	io.to(SSID).emit("bot message", formatMessage("kik_bot", mainMenu));

	return botOutput;
};


exports.getCurrentOrder = async (io, SSID) => {
	const order = await OrderModel.findOne({ SSID });

	let botOutput = "";

	if (order.currentOrder.length < 1) {
		botOutput = formatMessage("kik_bot", "⚠ You have no  Current Order");
		io.to(SSID).emit("bot message", botOutput);
	} else {
		botOutput = formatMessage(
			"kik_bot",
			formatMenu("Your Current Order", order.currentOrder)
		);
		io.to(SSID).emit("bot message", botOutput);
	}

	io.to(SSID).emit("bot message", formatMessage("kik_bot", mainMenu));

	return botOutput;
};

exports.cancelOrder = async (io, SSID) => {
	const order = await OrderModel.findOne({ SSID });

	let botOutput = "";

	if (order.currentOrder.length < 1) {
		botOutput = formatMessage("kik_bot", "⚠ You have No Confirmed Order");
		
		io.to(SSID).emit("bot message", botOutput);
	} else {
		botOutput = formatMessage("kik_bot", "Order Cancelled ");

		order.currentOrder = [];
		await order.save();

		io.to(SSID).emit("bot message", botOutput);
	}
	io.to(SSID).emit("bot message", formatMessage("kik_bot", mainMenu));

	return botOutput;
};



//get order History
exports.getOrderHistory = async (io, SSID) => {
	const order = await OrderModel.findOne({ SSID });

	let botOutput = "";

	if (order.placedOrder.length < 1) {
		botOutput = formatMessage(
			"kik_bot",
			"Empty❗ No order history"
		);
		io.to(SSID).emit("bot message", botOutput);
	} else {
		botOutput = formatMessage(
			"kik_bot",
			formatMenu("Your Order History:", order.placedOrder)
		);
		io.to(SSID).emit("bot message", botOutput);
	}
	io.to(SSID).emit("bot message", formatMessage("kik_bot", mainMenu));

	return botOutput;
};


//get SSSID
exports.getSessionInfo = async (SSID) => {
	const checksessionID = await OrderModel.findOne({ SSID });

	if (!checksessionID) {
		await OrderModel.create({ SSID });
	}
};

exports.getMessage = async (io, SSID) => {
	const oldMessages = await ChatModel.find({ SSID });

	if(!oldMessages) return;

	oldMessages.forEach((message) => {
		io.to(message.SSID).emit("user message", message.userOutput);
		io.to(message.SSID).emit("bot message", message.botOutput);
	});
}
