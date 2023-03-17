const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
    },
    avatarName: {
      type: String,
      default: "You",
    },
    orders:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
      },
  },
  { timestamps: true }
);

const CustomerModel = mongoose.model("Customer", customerSchema);

module.exports = CustomerModel;
