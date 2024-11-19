const express = require('express');
const router = express.Router();
const User = require('../model/User')  // schema model
const {body, validationResult} = require('express-validator') //validator of express help to validate eamil and other data

// create user or signin

router.post('/createuser',[//here check validator
    body('name','Name most be at least two character').isLength({min:2}),
    body('email','Eenter valid email').isEmail(),
    body('password','password most be at least 5 characters').isLength({min:5})
],async(req,res)=>{
    let success = false;
    const errors = validationResult(req); // get the validatoin results of email,name and password
    if(!errors.isEmpty()){
        success = false;
        return res.status(400).json({success,errors: errors.array()})
    }
    try{
        let user = await User.findOne({email:req.body.email})
        success = false;
        if(user){
            return res.status(400).json({success,error:"user with this email id is already exists"})
        }
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role
        })
        const data = {
            user:{
                id:user.id
            }
        }
        success = true;
        res.json({success})
        console.log(success+" "+"new user created")

    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})


// login
router.post('/login',[//here check validator
    body('email','Eenter valid email').isEmail(),
    body('password','password most be at least 5 characters').isLength({min:5},
        body('role','role is required')
    )
],async(req,res)=>{
    let success = false;

    const errors = validationResult(req); // get the validatoin results of email,name and password
    if(!errors.isEmpty()){
        success = false;
        return res.status(400).json({success,errors: errors.array()})
    }
    const  { email , password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            success = false;
            res.status(400).json({success,error:"incorrect email"})
        }
        if(password!=user.password){
            success = false;
            res.status(400).json({success,error:"incorrect password"});
        }
        if(role!=user.role){
            success = false;
            res.status(400).json({success,error:"incorrect data"});
        }

        const data = {
            user:{
                id:user.id
            }
        }

        success = true;
        res.json({success})
        console.log(success+" "+"new user created")

    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})

module.exports = router;