var mongoose = require("mongoose");
var mongoDBUrl = "mongodb://localhost:27017/express-product-project";

const initiateMongoServer = async () => {
	try {
		await mongoose.connect(mongoDBUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (e) {
		console.log("ERROR while connecting to mongodb" + e);
		throw e;
	}
};

module.exports = initiateMongoServer;
