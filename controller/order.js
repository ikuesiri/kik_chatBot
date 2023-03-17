const foodMenuModel = require("../model/foodMenuSchema");

// add a new menu item to the database
// async function addMenuItem(req, res, next) {
    const addToCart = async (req, res) =>{
  try {
    const item = req.body;
    console.log(item);

    const addItem = await foodMenuModel.create(item);

    res.status(201).json({
      status: true,
      message: "added new item successfully",
      addItem,
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
