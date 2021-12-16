const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
exports.auth=catchAsyncErrors(async(req,res,next)=>{
    const msg="hello"
    res.status(200).json({
        success:true,
        msg
    })
})

exports.createUser=catchAsyncErrors(
    async(req,res,next)=>{
        const name=req.body.name
        console.log(name)
        res.status(201).json({
            success:true,
            name
        })
    
    }
)