const express = require("express");
require('dotenv').config();
require("./database/conn");
const bodyParser = require('body-parser');

// models 
const productModel = require("./model/product_model");
const offersModel = require("./model/offers_model");

const app = express();
const PORT = 5000 || process.env.PORT;

// global middlewares
// app.use(()=>{
//     console.log("Hey called a route!")
// })

app.use(bodyParser.json());

var user = true;
// route middleware
const productMiddleware = (req,res,next)=>{
    console.log("Product middleware called");
    if(user){
        next();
    }else{
        res.status(401).json({message: "Unauthorized user"});
    }
}


//starting route to check health of server
app.get("/", (req, res)=>{
    res.send("Hey! Server is running fine 🚀 ");
});

app.get("/product", productMiddleware ,async (req, res)=>{
    try{
        const response = await productModel.find();
        res.json(response);
    }catch(err){
        res.status(401).json({error: err});
    }
});

app.post('/product', async (req, res)=>{
    const data =req.body;
    const newProduct =new productModel(data);
    const response = await newProduct.save();
    console.log('Response: ', response);
    res.send("Product created successfully");
});

// GET routes /offers : [{name, discount, expiry, terms, description}]
app.get("/offers", async (req, res)=>{
    try{
        const response = await offersModel.find();
        res.json(response);
    }catch(err){
        res.json({error: err});
    }
});

app.listen(PORT, (err)=>{
    if(err){
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