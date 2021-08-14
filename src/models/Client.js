const mongoose = require("mongoose");
const validator = require("validator");

//? client schema

const clientSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        lowercase:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Syntax");
            }
        }
    },
    address: {
        type:String
    },
    password: {
        type: String,
        required:true
    },
    confirmPassword: {
        type: String,
        required:true
    },
    gender: {
        type: String,
        required:true
    },
    age: {
        type: Number,
        required:true
    }
})

//? Model

const Client = new mongoose.model("Client", clientSchema);


module.exports = Client;