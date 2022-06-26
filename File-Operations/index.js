const express = require("express");
const fsOps = require("./src/js/fs");
var fileRoute = require("./routes/file-route");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/files", fileRoute);

fsOps.checkAndCreateFile();

const port = 8000;

app.get("/", (req, res) => {
	res.send("HelloWorld");
});

app.listen(port,()=>{
    console.log("Application started");
})
