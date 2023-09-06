const app = require("./app");
const databaseConnect = require("./config/database");

const port = process.env.port || 4000;

databaseConnect();

app.listen(port, () => {
    console.log(`Server Started at port: ${port}`);
});