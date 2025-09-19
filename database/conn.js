const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://havefunalltime123_db_user:nf6VZnsULxpyTETO@divyaecommercesite.4wyj5bn.mongodb.net/?retryWrites=true&w=majority&appName=Divyaecommercesite')
.then(()=>{
    console.log("Connected to DB ✌️")
})
.catch((err)=>{
    console.log("Disconnected from DB", err)
});