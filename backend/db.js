const mongoose = require('mongoose')
require("dotenv").config();


const url = process.env.MONGODB_URL;

const connectToMongose = () =>{
    mongoose.connect(url);
    console.log('mongo database connected successfully')
}

module.exports = connectToMongose;
