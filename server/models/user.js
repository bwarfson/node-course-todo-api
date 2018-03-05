const mongoose = require('mongoose');
const validator = require('validator');

var UserSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type:String,
            require: true
        },
        token: {
            type:String,
            require: true
        }
    }]
});

//UserSchema.methods.generateAuthToken

const User = mongoose.model('User', UserSchema);

module.exports = {User};