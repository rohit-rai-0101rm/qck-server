const express=require('express');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { registerUser, loginUser,logoutUser,resetPassword,updatePassword} = require('../controllers/userController');
const router=express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/password/update").put(isAuthenticatedUser, updatePassword);








module.exports=router


