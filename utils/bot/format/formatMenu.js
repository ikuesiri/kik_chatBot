const formatMenu = (msg, content) => {
	let arrayMsg = "";

	if (msg === "mainMenu") {
		arrayMsg = content.map((item) => {
				return `${item.number}: To ${item.text}`;
			})
			.join(`<br>`);
		arrayMsg = `Enter a number to select an option: <br>` + arrayMsg;
		return arrayMsg;
	}
	arrayMsg = content.map((item, index) => {

			return `${index + 1}: ${item.foodName} - ₦${item.price} `;
		}).join(`<br>`);

	arrayMsg = `${msg}: <br>` + arrayMsg;
	return arrayMsg;
};

module.exports = formatMenu;
