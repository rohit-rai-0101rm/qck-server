const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter Your userame"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },

  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  isAdmin:{
      type:Boolean,
      default:false,
  },
  
},{
    timestamps:true//handles created at and updated at
});
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
      next()
    }
    this.password=await bcrypt.hash(this.password,10)
  })
  UserSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRE
    })
  }
  UserSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
  }
  UserSchema.methods.getResetPasswordToken= function(){
    const resetToken=crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  }
module.exports=mongoose.model("User",UserSchema)