var mongoose = require("mongoose");

var purchaseSchema = new mongoose.Schema({
	cost: Number,
	quantity: Number,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

module.exports = mongoose.model("Purchase", purchaseSchema);