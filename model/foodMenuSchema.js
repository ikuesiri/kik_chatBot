const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");


const foodMenuSchema = new mongoose.Schema({
    id: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// MenuSchema.plugin(uniqueValidator);

foodMenuSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  const highestMenu = await this.constructor.findOne().sort("-id");
  if (!highestMenu) {
    this.id = 100;
  } else {
    this.id = highestMenu.id + 1;
  }

  return next();
});
const FoodMenuModel = mongoose.model("foodMenu", foodMenuSchema);

module.exports = FoodMenuModel;
