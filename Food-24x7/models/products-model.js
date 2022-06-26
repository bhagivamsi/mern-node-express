const mongoose = require("mongoose");

var productSchema = mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	description: { type: String, required: false },
	createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
	createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("products", productSchema);
