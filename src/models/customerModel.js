const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    mobileNumber: {
        type: String,
        trim: true,
        required: true
    },
    DOB: {
        type: String,
        trim: true,
        required: true
    },
    emailID: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },

    status: {
        type: String,
        trim: true,
        required: true,
        default: "INACTIVE"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


module.exports = new mongoose.model("customer", customerSchema)