const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        next();
    } else {
        const authToken = req.headers.authorization;
        // console.log("Request Headers: ", req.headers.authorization);

        if (!authToken) {
            next();
            // return next(new ErrorHandler("Please Login to access this resource", 401))
        }

        const token = authToken.split(" ")[1];

        try {
            const decodedData = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decodedData.id);
            // console.log("Token expires in", decodedData.exp);

            if (!user) {
                next();
                // return next(new ErrorHandler("Please Login to access this resource", 401))
            }

            req.user = user;
            next();
        } catch (error) {
            if (error.name == "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Token Expired. Log In Again"
                })
            } else {
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                })
            }
        }
    }
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