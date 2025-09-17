const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://ronit:${process.env.MONGODB_PASS}@ecommerce-site.dkbkbc2.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce-site`)
.then(()=>{
    console.log("Connected to DB 👍")
})
.catch((err)=>{
    console.log("Disconnected from DB", err)
}); 