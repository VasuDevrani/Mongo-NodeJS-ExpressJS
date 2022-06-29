const mongoose = require('mongoose');

const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter a valid email");
            }
        }
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 10,
        required: true,
    },
    address: {
        type: String,
        required: true
    }
})

// new model
const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;