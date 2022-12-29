const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema({
    cardNumber: {
        type: String,
        trim: true,
        required: true
    },
    cardType: {
        type: String,
        trim: true,
        required: true,
        enum:["REGULAR","SPECIAL"]
    },
    customerName: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        trim: true,
        required: true,
        Default: "ACTIVE"
    },
    vision: {
        type: String,
        trim: true,
       
    },
    customerID: {
        type: String,
        trim: true,
        required: true,
        ref: "customer"
    }
}, { timestamps: true })

module.exports = new mongoose.model("card", cardSchema)