var mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose")
 
var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	username: String,
	password: String,
	role: String,
	email: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);