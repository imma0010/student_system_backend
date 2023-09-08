const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.cookies);
    const token = req.headers.authorization;

    if (!token) {
        return next();
        // return next(new ErrorHandler("Please Login to access this resource.", 401));
    } else {
        try {
            const decodedData = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decodedData.id)

            if (!user) {
                return next(new ErrorHandler("Please Login to access this resource.", 401))
            }

            req.user = user;
        } catch (error) {
            // Check if the error is a TokenExpiredError
            if (error.name === 'TokenExpiredError') {
                // Handle the expired token error and return a 401 Unauthorized response
                return res.status(401).json({
                    success: false,
                    message: 'Token Expired. Log in again',
                });
            } else {
                // Handle other JWT verification errors
                // You can log or handle them differently based on your requirements
                console.error('JWT Verification Error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error',
                });
            }
        }
    }

    next();
})

exports.authorizedRole = (...roles) => {
    return (req, res, next) => {
        // console.log("Role of authenticated user", req.user.role);
        // console.log("Role that has authority", roles);
        if (req.user == undefined) {
            return res.status(401).json({
                success: false,
                message: "You do not have authority to perform this task"
            })
            // return next(new ErrorHandler(`You is not allowed to access this resource`, 403));
        }
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource`, 403));
        }

        next();
    }
}