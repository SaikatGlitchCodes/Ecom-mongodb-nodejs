const express = require("express");
const router = express.Router();
const userModel = require("../model/user_model");
const bcrypt = require("bcrypt");

router.get('/user', async (req, res) => {
    try {  
        const response = await userModel.find();
        res.status(200).json({data: response});
        
    } catch (err) {
        res.status(401).json({ error: err });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const response = await userModel.findOne({_id: req.params.id});
        if(!response){
            return res.status(404).json({message: "User not found", data: response})
        }
        res.status(200).json({message: "User found", data: response});
    }catch(err)
    {
        res.status(404).json({message:"this route doesnt exist", error: err});
    }
});


router.put('/user/:id', async (req, res) => {
    try {
        const response = await userModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: false});
        if(!response){
            return res.status(404).json({message: "User not found", data: response})
        }
        res.status(200).json({message: "User updated successfully", data: response});
    } catch (error) {
        res.status(400).json({message:"Couldn't update user", error: error.message });
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        const response = await userModel.deleteOne({_id: req.params.id});
        if(response.deletedCount === 0){
            return res.status(404).json({message: "User not found", data: response})
        }
        res.status(200).json({message: "User deleted successfully", data: response});
    } catch (error) {
        res.status(400).json({message:"Couldn't delete user", error: error.message });
    }
});

module.exports = router;

