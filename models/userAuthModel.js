const mongoose = require ("mongoose");
const userAuthSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    password: {
        type : String,
        required : true,
    },
    otp:{
        type: String,
        required: true,
    },
    isVerified:{
        type: Boolean,
    },
    role : {
        default: 0,
        type : Number,
    }
},{timestamps: true})

const userAuthModel = mongoose.model("userAuth", userAuthSchema);
module.exports = userAuthModel;

