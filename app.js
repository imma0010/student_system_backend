const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute")
const studentRoute = require("./routes/studentRoute");

const app = express();
app.use(cors())
app.use(cookieParser());
app.use(express.json());
require('dotenv').config();

app.use("/api", userRouter);
app.use("/api", studentRoute);

module.exports = app;