const express = require("express");
const  {addToCart, viewFoodCart} = require("../controller/menu")

const foodMenu = express.Router();

foodMenu.post("/", addToCart)
foodMenu.get("/", viewFoodCart)


module.exports = foodMenu;
