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
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});
exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        username:req.body.username,
        email:req.body.email    
    }
    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
       success:true 
    })

})
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const query=req.query.new

    const users = query?await User.find().sort({_id:-1}).limit(3):await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  });
  exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
      );
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });
  exports.getStats = catchAsyncErrors(async (req, res, next) => {
  const date=new Date();
  const lastYear=new Date(date.setFullYear(date.getFullYear()-1))
  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);
    res.status(200).json({
      success: true,
      data,
    });
  });
  exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Delete User --Admin
  exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
  
  
    await user.remove();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });

