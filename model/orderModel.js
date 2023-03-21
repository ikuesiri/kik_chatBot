const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        SSID: {
            type: String,
			required: true
        },        
        placedOrder: [
        {
            number: Number,
            foodName : String,
            price: Number
        }
        ],
        currentOrder: [
        {
            number: Number,
            foodName : String,
            price: Number
        }
        ]
    },
    { timestamps: true }
); 

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
