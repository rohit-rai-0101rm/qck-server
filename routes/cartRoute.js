const express = require("express");
const { makeNewCart, updateCart, deleteCart, getUserCart, getAllUserCart } = require("../controllers/cartController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(isAuthenticatedUser, makeNewCart);
router.route("/:id").put(isAuthenticatedUser, updateCart);
router.route("/:id").delete(isAuthenticatedUser, deleteCart);
router.route("/find/:userId").get(isAuthenticatedUser, getUserCart);

router.route("/").get(isAuthenticatedUser,authorizeRoles("admin"), getAllUserCart);
module.exports = router;