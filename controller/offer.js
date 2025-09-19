const express=require("express");


const offersModel = require("../model/offers_model");
const ordrModel=require("../model/orders_model")


app.get('/offers',async (req,res)=>{
    try{
        const response=await offersModel.find();
        res.status(200).json(response)
    }
    catch(err){
        res.status(401).json({error:err})
    }
})



app.get('/orders',async (req,res)=>{
    try{
        const response=await ordrModel.
    }
    catch(err){
        res.status(401).json({error:err})
    }
})


