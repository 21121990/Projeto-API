const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const gamesController = require("./games/gamesController");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection.authenticate().then(() => {
    console.log("Conexão com banco realizada!");
}).catch((err) => {
    console.log(err);
})

app.use("/", gamesController);


app.listen(4000, () => {
    console.log("API Online!")
})