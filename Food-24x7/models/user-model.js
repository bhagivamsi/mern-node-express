const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	createdAt: { type: Date, default: Date.now() },
	products: [{ type: mongoose.SchemaTypes.ObjectId, ref: "products" }],
});

module.exports = mongoose.model("user", userSchema);
