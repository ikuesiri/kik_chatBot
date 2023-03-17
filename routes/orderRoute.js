const express = require("express");
const  {addToCart, viewFoodCart} = require("../controller/order")

const foodMenu = express.Router();

foodMenu.post("/", addToCart)
foodMenu.get("/", viewFoodCart)


module.exports = foodMenu;
