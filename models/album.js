var mongoose = require("mongoose");

var albumSchema = new mongoose.Schema({
	name: String,
	dateCreated: Date,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

module.exports = mongoose.model("Album", albumSchema);