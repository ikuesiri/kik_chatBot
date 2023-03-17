const mongoose = require("mongoose");
const moment = require("moment");

const ObjectId = Schema.ObjectId;

const OrderSchema = new mongoose.Schema({
  id: ObjectId,
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
  orderedAT: {
    type: String,
    default: () => moment().format("LLLL"),
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
