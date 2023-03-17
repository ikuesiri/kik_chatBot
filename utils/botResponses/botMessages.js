//to format the time
const moment = require("moment");

const mainMenu = () => {
   let msg = "<hr>"
   msg += "<br>"
     msg += `Hello customer, Welcome to Kikz Kitchen.`
    msg += `I'm kik Bot and I'm only here to Assist to you.`
    msg += "<br><br>"
    msg += " Please select a number to Proceed."
    const menu = [
        "<b>Select 1</b> to Place an order",
        "<b>Select 99</b> to Checkout order",
        "<b>Select 98</b> to view order history",
        "<b>Select 97</b> to view current history",
        "<b>Select 0</b> to cancel order"
      ]
      msg += "<ul>"
      menu.forEach(menu => {
        msg += `<li>${menu}</li>`;
      })

    return {
        user: "Kik_bot",
        msg,
        time:  moment().format("h:mm a")
    }
};

module.exports = {mainMenu}