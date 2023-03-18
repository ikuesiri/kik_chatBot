const mongoose = require("mongoose");
const moment = require("moment");


const OrderSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  orderedItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodMenu",
  },

  orderedBy: {
    type: String,
    ref: "Customer",
    localField: "orderedBy",
    foreignField: "customerId",
  },
  createdAt : {
    type: String,
    default: () => moment().format("LLLL"),
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
