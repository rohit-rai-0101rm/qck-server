const Product=require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
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
  exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const qNew = req.query.new;
    const qCateg=req.query.category;
    let products
    if(qNew){
        products=await Product.find().sort({
            createAt:-1
        }).limit(1)
    }
    else if(qCateg){
        products=await Product.find({categories:{
            $in:[qCateg],
        }},
        )}
        else{
           products=await Product.find() 
        }    
  
    res.status(200).json({
      success: true,
      products
    });
  });
  
  // Get All Product (Admin)
  exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });
  
  exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  });
  
  // Update Product -- Admin
  
  exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      product,
    });
  });
  
  // Delete Product
  
  exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
  
    await product.remove();
  
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  });
  
