//to format the time
const moment = require("moment");
const customerModel = require("../../model/userSchema");
const FoodMenuModel = require("../../model/foodMenuSchema");
const OrderModel = require("../../model/orderSchema");

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

// Food Menu Function
const getFoodMenu = async() =>{
  try {
    const foodMenu = await FoodMenuModel.find();
    if(foodMenu.length < 1){
      return new Error("Sorry, We have closed!")
    }
    return foodMenu;
    
  } catch (error) {
     return error.message;
  }
}

//This Function Handles Order
const createOrder = async(sessionId, foodId) => {
    const customerId = sessionId;
    const menuOption = foodId;
    const  customer = await customerModel.findOne({customerId})
    if(!customer){
      return new Error("Cannot be found!")
    }
    const foodMenu = await FoodMenuModel.findOne({
      id: foodId
    });

    if(!foodMenu){
      return new Error("No menu found!")
    }

    const createNewOrder = await OrderModel.create({
      orderedItem : foodMenu._id,
      orderId : menuOption,
      orderedBy : customer.customerId
    })
    // customer.orders = customer.orders.concat(createNewOrder.id)
    customer.orders +=  createNewOrder.id
    await customer.save()
    return  createNewOrder
}

const findOrder = async(sessionId, foodId )=> {

      const details= await FoodMenuModel.findOne({_id: foodId});

      return details;

}

module.exports = {mainMenu, getFoodMenu, createOrder, findOrder}