const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");

exports.createUser = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.body);
    const {name, email, password} = req.body;

    if (password.length < 8) {
        return next(new ErrorHandler("Password should be at least 8 characters.", 400))
    }

    const user = await User.create({
        name,
        email,
        password
    })

    sendToken(user, 201, res);
})

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    console.log("Trying to login");
    const {email, password} = req.body;

    if(!password) {
        return next(new ErrorHandler("Please Enter Password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const isMatch = await user.comparePassword(password);
    
    if(!isMatch) {
        return next(new ErrorHandler("Password Incorrect"));
    }

    sendToken(user, 200, res);
})

// logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})
