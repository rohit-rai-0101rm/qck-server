const mongoose = require("mongoose");
 
const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Invalid user"],
    
  },

  products: [
    {
        productId:{
            type:String
        },
        quantity:{
            type:Number,
            default:1
        }
    }

  ],
  
  
},{
    timestamps:true//handles created at and updated at
});
module.exports=mongoose.model("Cart",CartSchema)