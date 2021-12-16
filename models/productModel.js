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

  derscription: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
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