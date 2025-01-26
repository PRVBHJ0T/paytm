
const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://prabhjotwerk:VHANzTRiXIeZhB22@cluster0.la0ugaa.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName:String,
    password: String,
})

const User =mongoose.model('User',userSchema)

module.exports = {User};