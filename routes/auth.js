const express=require('express');

const{auth,createUser}=require('../controllers/auth.js')
const router=express.Router()
router.route("/auth").get(auth)
router.route("/posting").post(createUser)

module.exports=router