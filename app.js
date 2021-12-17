const express = require("express");
const app = express();
const cors =require ('cors');

const cookieParser=require('cookie-parser')
const errorMiddleware=require("./middleware/error")
app.use(cors());

app.use(express.json())
app.use(cookieParser())
const user=require("./routes/userRoute")
const product = require("./routes/productRoute");

app.use("/api/v1",user)

app.use("/api/v1", product);

app.use(errorMiddleware)

module.exports=app