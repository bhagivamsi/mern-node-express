var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
const User = require("../models/user-model");
const Product = require("../models/products-model");

router.post("/", auth, async (req, res) => {
	const user = await User.findOne(req.user);
	try {
		if (!user) {
			return res.status(401).json({ message: "Unauthorized user" });
		}
		const { name, price, description } = req.body;
		const product = new Product();
		product.name = name;
		product.price = price;
		product.description = description;
		product.createdBy = user;
		await product.save();

		return res.status(200).json({ message: "Product saved successfully" });
	} catch (e) {
		console.log(e);
		throw e;
	}
});

router.get("/", auth, async (req, res) => {
	const user = await User.findOne(req.user, { products: 0 });
	try {
		if (!user) {
			return res.status(401).json({ message: "Unauthorized user" });
		}
		let products = await Product.find(
			{},
			{ createdBy: 0, createdAt: 0, __v: 0 }
		);
		console.log(products);
		return res.status(200).json(products);
	} catch (e) {
		console.log(e);
		throw e;
	}
});
module.exports = router;
