const foodMenuModel = require("../model/foodMenuSchema");

// add a new menu item to the database
// async function addMenuItem(req, res, next) {
    const addToCart = async (req, res) =>{
  try {
    const items = req.body;
    console.log(items);

    const addFoodItems = await foodMenuModel.create(items);

    res.status(201).json({
      status: true,
      message: "foodStore Updated!",
      addFoodItems,
    });
  } catch (error) {
    res.status(500).send({ message : error.message })
  }
}

// get all menu items
const viewFoodCart = async(req, res) => {
  try {
    const foodMenu = await foodMenuModel.findAll({});

    res.status(200).json({
      status: true,
      message: "loaded menu successfully",
      foodMenu,
    });
  } catch (error) {
    res.status(500).send({ message : error.message })
  }
}

module.exports = { addToCart, viewFoodCart};
