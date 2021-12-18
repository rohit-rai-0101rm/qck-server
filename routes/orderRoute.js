const express = require("express");
const {
  makeNewCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllUserCart,
} = require("../controllers/cartController");
const {
  newOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrders,
  getOrderStats,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(isAuthenticatedUser, newOrder);
router.route("/:id").put(isAuthenticatedUser, updateOrder);
router.route("/:id").delete(isAuthenticatedUser, deleteOrder);
router.route("/find/:userId").get(isAuthenticatedUser, getUserOrders);

router
  .route("/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/orderStats")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getOrderStats);
module.exports = router;
