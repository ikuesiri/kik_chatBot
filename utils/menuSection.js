const mainMenu = [
	{ number: 1, text: "Place An Order" },
	{ number: 99, text: "Checkout Order" },
	{ number: 98, text: "Check Order History" },
	{ number: 97, text: "Check Current Order" },
	{ number: 0, text: "Cancel Order" },
];

const foodMenu = [
	{ number: 1, foodName: "Cat-FIsh Barbeque", price: 3000 },
	{ number: 2, foodName: "Jollof Rice & Turkey", price: 3500 },
	{ number: 3, foodName: "Fried Rice & Chicken", price: 3000 },
	{ number: 4, foodName: "Ofada Rice & GoatMeat", price: 2800 },
	{ number: 5, foodName: "Starch & Banga Soup", price: 3000 },
	{ number: 6, foodName: "Amala, Ewedu & Gbegiri", price: 1500 },
	{ number: 7, foodName: "FuFu & Egusi Soup", price: 2500 }
];

module.exports = {
	mainMenu,
	foodMenu,
};
