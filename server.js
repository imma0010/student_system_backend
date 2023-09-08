const app = require("./app");
const databaseConnect = require("./connection/database")

const port = process.env.PORT || 4000;

databaseConnect();

app.listen(port, () => {
    console.log(`Server Started at port: ${port}`);
});