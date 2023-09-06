const sendToken = (user, statusCode, res) => {
    const token = user.generateAuthToken();

    // const options = {
    //     expires: new Date(Date.now() + 24*60*60*1000),
    //     httpOnly: true
    // }

    res.status(statusCode).json({
        success: true,
        user,
        token
        // options
    })
}

module.exports = sendToken;