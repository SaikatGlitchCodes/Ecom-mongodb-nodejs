const express = require("express");
require('dotenv').config();
require("./database/conn");
const bodyParser = require('body-parser');

// models 
const productModel = require("./model/product_model");
const offersModel = require("./model/offers_model");

const app = express();
const PORT = 5000 || process.env.PORT;
app.use(bodyParser.json());

//starting route to check health of server
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hey! Server is running fine 🚀 " });
});

app.get("/product", async (req, res) => {
    const {inStock, maxPrice, sortPrice, sortName} = req.query;

    try {
        const filter = {price: { $lt : maxPrice} };
        const sort = {};
        
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

app.post('/product', async (req, res) => {
    try {
        const newProduct = new productModel(req.body);
        const response = await newProduct.save();
        res.status(201).json({ message: "Product created successfully", data: response });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/product/:id', async(req, res)=>{
    try{
        const response = await productModel.find({id: req.params.id});
        res.status(200).json(response);
    }catch(err){
        res.status(401).json({error: err});
    }
});


// GET routes /offers : [{name, discount, expiry, terms, description}]
app.get("/offers", async (req, res) => {
    try {
        const response = await offersModel.find();
        res.json(response);
    } catch (err) {
        res.json({ error: err });
    }
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server failed to start", err);
        return
    }
    console.log(`Server is running on port ${PORT} 🔥`);
});

// folder ---> main ---> npm init -y ---> npm i express


// Introduction to Node js
// Creating Express js server
// Create GET, POST, PUT, DELETE
// route, global middlewares
// Connecting to databases (mongodb, mysql)
// Authentication [JWT, Outh]


// Advance : stream, file(sync and async), socket.io