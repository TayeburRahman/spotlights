const mongoose = require("mongoose");

// model step: 1
const ordersModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        exPassword:{
            type: String, 
        },
        price: {
            type: Number,
            required: true,
        },
        writingPackage: {
            type: Object,
            required: true,
        },
        publishPackage: {
            type: Object,
            required: true,
        },
        brand: {
            type: Object,
            required: true,
        },
        newsStory: {
            type: Object, 
        }, 
        detailedResearch: {
            type: Object,
             
        },
        i_date: {
            type: String,
            
        }, 
        type: {
            type: String, 
            enum: ["express", "login"] 
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

module.exports = mongoose.model("orders", ordersModel);ssss