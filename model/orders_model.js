const mongoose=require("mongoose");


const orderSchema=mongoose.Schema({
    id:String,
    OrderId:String,
    ProductName:String, 
    InStock:Boolean,
    Status:{
        type:String,
        enum:["InProcess","Cancelled","Delivered"]
    },


})

module.exports=mongoose.model("Orders",orderSchema);