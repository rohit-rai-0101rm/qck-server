const ErrorHandler = require("../utils/errorHandler");
const crypto=require("crypto")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User=require("../models/userModel");
const sendToken = require("../utils/jwtToken");
//const sendEmail=require('../utils/sendEmail.js')
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {username,email,password}=req.body
    const user=await User.create({
        username,email,password,
        
    })
    sendToken(user,201,res)

})
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const{email,password}=req.body
    if(!email || !password){
        return next(new ErrorHandler("please enter email and password",400))
    }
    const user=await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid user or password",401))
    }
    const isPasswordMatched=await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid user or password",401))
    }
    sendToken(user,200,res)

})
exports.logoutUser=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json
    ({
        success:true,
        message:"logged out"
    })
})
