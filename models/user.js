var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    email: String,
    gender: String,
    
    username: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    verified: {type: Boolean, default: false},
    verificationCode: String,

}, { timestamps: {} });

userSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model("User" , userSchema);