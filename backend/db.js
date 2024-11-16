const mongoose = require('mongoose')

const mongoUrl ='mongodb+srv://vrajprajapati07132004:TxCJj0FUtiMnxlxR@authrouting.pkugp.mongodb.net/?retryWrites=true&w=majority&appName=AuthRouting';
//TxCJj0FUtiMnxlxR;


const connectToMongose = () =>{
    mongoose.connect(mongoUrl);
    console.log('mongo database connected successfully')
}

module.exports = connectToMongose;
