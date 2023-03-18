const mongoose = require("mongoose");


const foodMenuSchema = new mongoose.Schema({
    foodId: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

// foodMenuSchema.pre("save", async function (next) {
//   if (!this.isNew) {
//     return next();
//   }

//   const highestMenu = await this.constructor.findOne().sort("-id");
//   if (!highestMenu) {
//     this.id = 10;
//   } else {
//     this.id = highestMenu.id + 1;
//   }

//   return next();
// });
const FoodMenuModel = mongoose.model("foodMenu", foodMenuSchema);

module.exports = FoodMenuModel;
