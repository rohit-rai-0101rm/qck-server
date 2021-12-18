const Order = require("../models/Order");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const order = new Order(req.body);
  const savedOrder = await order.save;

  res.status(201).json({
    success: true,
    savedOrder,
  });
});
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const updatedOrder = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!updatedOrder) {
    return next(new ErrorHandler("order not found", 404));
  }
  res.status(201).json({
    success: true,
    updatedCart,
  });
});
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.id);
  if (!Order) {
    return next(new ErrorHandler("order not found", 404));
  }

  res.status(201).json({
    success: true,
    message: "order deleted succesfully",
  });
});
exports.getUserOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ userId: req.params.userId });
  if (!orders) {
    return next(new ErrorHandler("no orders for this user", 404));
  }
  res.status(201).json({
    success: true,
    orders,
  });
});
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
  
    res.status(201).json({
      success: true,
      orders,
    });
  });
  exports.getOrderStats = catchAsyncErrors(async (req, res, next) => {
    const date=new Date();
    const lastMonth=new Date(date.setMonth(date.getMonth()-1))
    const previousMonth=new Date(new Date().setMonth(lastMonth.getMonth()-1))

    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales:"$amount"
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: $sales },
        },
      },
    ]);
      res.status(200).json({
        success: true,
        income,
      });
    });
  