const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    pic: {
        type: Array,
        default: []
    },
    stock: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


mongoose.model("Product", productSchema)