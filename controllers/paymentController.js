const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const dotenv = require("dotenv");

dotenv.config({ path: "config/config.env" });

const stripe=require("stripe")(process.env.STRIPE_KEY)
exports.makePayment = catchAsyncErrors(async (req, res, next) => {
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        "currency":"inr"
    
    },
    (stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
        }
        else{
            res.status(200).json(stripeRes)
        }
    }
    
    )
    res.status(201).json({
      success: true,
      newProduct,
    });
  });