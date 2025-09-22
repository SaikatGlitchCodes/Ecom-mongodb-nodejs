const express = require("express");
require('dotenv').config();
require("./database/conn");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors());


//starting route to check health of server
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hey! Server is running fine 🚀 " });
});

app.use('/', require('./controller/auth'));
app.use('/', require('./controller/product'));
app.use('/', require('./controller/user'));
app.use('/', require('./controller/offer'));

// Not found
app.use((req, res)=>{
    res.status(404).json({
    error: 'Not Found',
    message: 'The requested route does not exist'
  });
});

// starting the server
app.listen(PORT, (err) => {
    if (err) {
        console.log("Server failed to start", err);
        return
    }
    console.log(`Server is running on port ${PORT} 🔥`);
});