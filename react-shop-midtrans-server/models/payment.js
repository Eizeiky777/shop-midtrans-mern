const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const paymentSchema = mongoose.Schema({
    user: {
        type:ObjectId,
        ref:"User"
    },
    data: {
        type: Object
    },
    product:{
        type: Array,
        default:[]
    }
}, { timestamps: true })

mongoose.model("Payment", paymentSchema)