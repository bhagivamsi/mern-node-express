var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");

const { check, validationResult } = require("express-validator/check");

router.post(
	"/register",
	[
		check("username", "Please provide username").not().isEmpty(),
		check("email", "Email validation failed").isEmail(),
		check("password", "Password should be minimum 6 characters").isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: validationErrors.array() });
		}

		const { username, password, email } = req.body;
		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(200).json({ message: "User already present!!" });
			}

			console.log(username + "\t" + password + "\t" + email);
			user = new User({ username, password, email });
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			let payload = { user: { id: user.id } };
			jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
				if (err) {
					throw e;
				}
				res.status(200).json({ status: "User created successfully" });
			});
		} catch (e) {
			console.log(e);
			res.status(500).send("Error");
		}
	}
);

router.post("/login", [
	check("username", "Please provide username").not().isEmpty(),
	check("password", "Password should be minimum 6 characters").isLength({
		min: 6,
	}),
	async (req, res) => {
		const validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
			return res.status(400).json({ error: validationErrors.array() });
		}

		const { username, password } = req.body;
		try {
			let user =await User.findOne({ username });
			if (!user) {
				return res.status(400).json({ message: "Incorrect username/password" });
			}
			console.log(user);
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ message: "Incorrect username/password" });
			}

			let payload = { user: { id: user.id } };
			jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
				if (err) {
					throw e;
				}
				res.status(200).json({ userid: user.username, token: token });
			});
		} catch (e) {
			console.log(e);
			res.status(500).send("Error");
		}
	},
]);

module.exports = router;
