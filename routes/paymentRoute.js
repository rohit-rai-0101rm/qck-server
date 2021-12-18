const express = require("express");
const { makePayment } = require("../controllers/paymentController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/payment",makePayment)