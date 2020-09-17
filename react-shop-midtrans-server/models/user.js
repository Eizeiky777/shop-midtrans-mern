
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name:{
        type:  String,
        required: true
    },
    role:{
        type: Number,
        default: 0
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    history: [{
        info:String,
        paymentId:{type:ObjectId, ref:"Payment"}
    }],
    pic:{
        type: String,
        default:"https://res.cloudinary.com/dzrhkpwph/image/upload/v1599313070/No-Image-Available_apxhlj.png"
    }
},{timestamps:true})

mongoose.model("User", userSchema)