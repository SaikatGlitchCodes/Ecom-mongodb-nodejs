// sign in, sign up, sign out
const express = require('express');
const router = express.Router();
const userModel = require("../model/user_model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    // check if user with email exists
    const response =await userModel.findOne({email: email});
    console.log(response);
    if(!response){
        return res.status(404).json({message: "User does not exist"});
    }
    // check if password matches
    if(!bcrypt.compareSync(password, response.hashedPassword)){
        return res.status(401).json({message: "Invalid credentials"});
    }
    console.log("User logged in successfully");
    // generate a token
    const token = jwt.sign({ id: response._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({message: "Login successful", token: token});
});

router.post('/register', async (req, res) => {
    const { id, name, email, address, password, profileImg } = req.body;
    const hashedPassword =bcrypt.hashSync(password, 8);

    try {
        const newuser = new userModel({
            id,
            name,
            email,
            address,
            hashedPassword,
            profileImg
        });

        const response = await newuser.save();
        res.status(201).json({ message: "User created successfully", data: response });
    } catch (error) {
        res.status(400).json({message:"Couldn't create user", error: error.message });
    }
});

module.exports = router;