const express = require("express");
require('dotenv').config();
require("./database/conn");

// models 
const productModel = require("./model/product_model");
const offersModel = require("./model/offers_model");

const app = express();
const PORT = 4000 || process.env.PORT;

//starting route to check health of server
app.get("/", (req, res)=>{
    res.send("Hey! Server is running fine 🚀 ");
});

app.get("/product", async (req, res)=>{
    try{
        const response = await productModel.find();
        res.json(response);
    }catch(err){
        res.json({error: err});
    }
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