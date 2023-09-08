const mongoose = require("mongoose");

const databaseConnect = () => {
    console.log("Trying to connect to database");
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
    }).then((data) => {
        console.log(`Database connected to ${data.connection.host}`);
    }).catch((err) => {
        console.error("Error connecting to the database:", err);
    })
}

module.exports = databaseConnect;