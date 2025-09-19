const express = require("express");
const router = express.Router();
const userModel = require("../model/user_model");

router.get('/user', async (req, res) => {
    //const {sortname} = req.query;

    try {
        // //const profile = {};
        // const sortobj = {};
        //  if(sortname){
        //     sortobj.name = 1
        // }
        // else{
        //     sortobj.name = 1
        // }
      
               
        const response = await userModel.find();
        res.status(200).json(response);
        
    } catch (err) {
        res.status(401).json({ error: err });
    }
});


router.get('/user/:id', async (req, res) => {
    try {
        const response = await userModel.findOne({id: req.params.id});//find returns array, so you can use length property
        res.status(200).json(response);
        if(response.length === 0)
        {
           return  res.status(400).json({message:"User with this ID doesnt exist"});
        }
    }catch(err)
    {
        res.catch(404).json({message:"this route doesnt exist"});
    }
    
});

router.post('/user', async (req, res) => {
    try {
        const newuser = new userModel(req.body);
        const response = await newuser.save();
        res.status(201).json({ message: "User created successfully", data: response });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;

