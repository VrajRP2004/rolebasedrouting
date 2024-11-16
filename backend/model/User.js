const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    }
});
const  User = mongoose.model('user',userSchema)
module.exports = User;