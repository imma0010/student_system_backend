const express = require("express");
const userRouter = require("./routes/userRoute")
const studentRoute = require("./routes/studentRoute");

const app = express();
app.use(express.json());
require('dotenv').config();

app.use("/api", userRouter);
app.use("/api", studentRoute);

module.exports = app;