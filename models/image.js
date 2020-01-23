var mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
	location: String,
	featured: String,
	category: String,
	subcategory: String,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

module.exports = mongoose.model("Image", imageSchema);