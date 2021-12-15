const express = require("express");
const app = express();
const cors =require ('cors');

const cookieParser=require('cookie-parser')
const errorMiddleware=require("./middleware/error")
app.use(cors());

app.use(express.json())
app.use(cookieParser())




app.use(errorMiddleware)

module.exports=app