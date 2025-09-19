const express=require("express");
const router=express.Router();
const app = express();
const Ordermodel=require('../model/orders_model');

router.get('/orders',async (req,res)=>{
    try{
        const response=await Ordermodel.find()
        res.status(200).json(response)
    }
    catch(err){
        res.status(401).json({error:err})
    }
})

router.post('/orders',async (req,res)=>{
    try{
        const Order_prod=new Ordermodel(req.body)
        const response= await Order_prod.save()
        res.status(200).json(response);
    }
    catch(err){
        res.status(401).json({error:err})
    }
})

module.exports=router;


