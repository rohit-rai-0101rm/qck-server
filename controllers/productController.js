const Product=require("../models/productModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
//const cloudinary = require("cloudinary");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = new Product(req.body);
  const newProduct=await product.save();
    res.status(201).json({
      success: true,
      newProduct,
    });
  });
