const mongoose = require("mongoose");

// model step: 1
const ordersModel = new mongoose.Schema(
    {
        packages: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        checkout_details: {
            type: Object,
            required: true,
        },
        payment_details: {
            type: Object,
            required: true,
        }, 
        i_date: {
            type: String,
            
        }, 
        payment: {
            type: String,
            default: "UnPaid",
            enum: ["UnPaid", "Paid"],
            
        }, 
        status: {
            type: String,
            default: "Pending",
            enum: ["Processing", "Compted",'Pending'],
          },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("orders", ordersModel);