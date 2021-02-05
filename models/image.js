var mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
	location: String,
	featured: String,
	displayType: String,	
	category: String,
	subcategory: String,
	belongsToAlbum: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Album"
		},
	}
});

module.exports = mongoose.model("Image", imageSchema);