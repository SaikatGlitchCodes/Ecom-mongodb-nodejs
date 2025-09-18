const express = require("express");
require('dotenv').config();
require("./database/conn");
const bodyParser = require('body-parser');
const offersModel = require("./model/offers_model");

const app = express();
const PORT = 5000 || process.env.PORT;
app.use(bodyParser.json());

//starting route to check health of server
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hey! Server is running fine 🚀 " });
});

app.use('/', require('./controller/product'));

// GET routes /offers : [{name, discount, expiry, terms, description}]
app.get("/offers", async (req, res) => {
    try {
        const response = await offersModel.find();
        res.json(response);
    } catch (err) {
        res.json({ error: err });
    }
});

// Not found
app.use((req, res)=>{
    res.status(404).json({
    error: 'Not Found',
    message: 'The requested route does not exist'
  });
})

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