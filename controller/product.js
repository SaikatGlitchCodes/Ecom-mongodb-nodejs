const express = require("express");
const router = express.Router();
const productModel = require("../model/product_model");

router.get("/product", async (req, res) => {
    const {inStock, maxPrice, sortPrice, sortName} = req.query;

    try {
        const filter = {};
        const sort = {};
        if(maxPrice){
            filter.price = { $lt : maxPrice} 
        }
        if(sortPrice){
            sort.price = 1
        }
        if(sortName){
            sort.name = 1
        }
        if(inStock){
            filter.inStock = true;
        }
        
        const response = await productModel.find(filter).sort(sort);
        res.status(200).json(response);
        
    } catch (err) {
        res.status(401).json({ error: err });
    }
});

router.post('/product', async (req, res) => {
    try {
        const newProduct = new productModel(req.body);
        const response = await newProduct.save();
        res.status(201).json({ message: "Product created successfully", data: response });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/product/:id', async(req, res)=>{
    console.log("M1")
    try{
        const response = await productModel.findOne({id: req.params.id});
        res.status(200).json(response);
    }catch(err){
        res.status(401).json({error: err});
    }
});

router.patch('/product/:id', async(req, res)=>{
    console.log('Params :',req.params);
    console.log('Body :', req.body);
    try{
        const response = await productModel.updateOne({id: req.params.id}, {$set: req.body});
        res.status(200).json({message: "Updated the product", response})
    }catch(err){
        res.status(401).json({error: err});
    }
});

router.delete('/product/:id', async(req, res)=>{
    try{
        const response = await productModel.deleteOne({id: req.params.id});
        res.status(200).json({message: "Deleted the product", response})
    }catch(err){
        res.status(401).json({error: err});
    }
})

module.exports = router;