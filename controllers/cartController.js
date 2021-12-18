const Cart = require("../models/cartModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
exports.makeNewCart = catchAsyncErrors(async (req, res, next) => {
  const newCart = req.body;
  const savedCart = await newCart.save;

  res.status(201).json({
    success: true,
    savedCart,
  });
});
exports.updateCart = catchAsyncErrors(async (req, res, next) => {
  const updatedCart = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  res.status(201).json({
    success: true,
    updatedCart,
  });
});
exports.deleteCart = catchAsyncErrors(async (req, res, next) => {
  await Cart.findByIdAndDelete(req.params.id);

  res.status(201).json({
    success: true,
    message: "cart deleted succesfully",
  });
});
exports.getUserCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.params.id });

  res.status(201).json({
    success: true,
    cart,
  });
});
exports.getAllUserCart = catchAsyncErrors(async (req, res, next) => {
    const carts = await Cart.find();
  
    res.status(201).json({
      success: true,
      carts,
    });
  });
  