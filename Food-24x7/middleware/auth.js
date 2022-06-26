const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("authorization");
	if (!token) return res.status(401).json({ message: "You are unauthorized" });

	try {
		const decodedValues = jwt.verify(token, "randomString");
		req.user = decodedValues.user;
		next();
	} catch (e) {
		throw e;
	}
};
