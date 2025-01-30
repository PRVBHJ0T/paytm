
const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://prabhjotwerk:VHANzTRiXIeZhB22@cluster0.la0ugaa.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName:String,
    password: String,
})
const accountSchema = new  mongoose.Schema({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    balance :{         
        type:Number,
        required:true
    }
})
const User =mongoose.model('User',userSchema)
const Accounts = mongoose.model('Accounts',accountSchema)


module.exports = {User,Accounts};