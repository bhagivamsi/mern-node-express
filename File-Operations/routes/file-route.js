var express = require("express");
var router = express.Router();
const fsOps = require("../src/js/fs");

router.get("/names", (req, res, next) => {
	res.json({ fileNames: fsOps.loadFileNames() });
});

module.exports=router;