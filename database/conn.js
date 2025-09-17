const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://sparkyaipvtltd_db_user:${process.env.MONGODB_PASS}@cluster0.f19xawc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log("Connected to DB ✌️")
})
.catch((err)=>{
    console.log("Disconnected from DB", err)
});