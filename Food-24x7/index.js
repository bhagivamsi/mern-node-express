const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user-route");
const products = require("./routes/products-route");

var app = express();

const initiateMongoServer = require('./config/db');
initiateMongoServer();

app.use(bodyParser.json());
app.use("/api/v1", user);
app.use("/api/v1/products", products);

const port = 8000;


app.listen(port,()=>{
    console.log("Application started");
})
