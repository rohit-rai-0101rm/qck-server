const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter product Name"],
    unique:true,
    trim: true,
    minLength: [4, "Name should have more than 4 characters"],

  },

  description: {
    type: String,
    required: [true, "Please Enter product description"],
  },
  img:{
    type:String,
    required:true
  },
  categories: {
    type: Array,
  },
  size:{
    type: String,
      
  },
  color: {
    type: String,
    
  }, 
  price: {
    type: Number,
    required: [true, "Please Enter a price for the product"],
    
  },
  
},{
    timestamps:true//handles created at and updated at
});
module.exports=mongoose.model("Product",ProductSchema)