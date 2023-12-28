const mongoose = require ("mongoose");
const employeeSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, 'Name is required'],
    },
    email:{
        type: String,
        required : [true, 'email is required']
    },
    role : {
        type : String,
        required : [true, 'role is required']
    }
})

const employeeModel = mongoose.model('employee', employeeSchema);
module.exports = employeeModel;