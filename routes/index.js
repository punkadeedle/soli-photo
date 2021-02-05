var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Album = require("../models/album");
var Image = require("../models/image");
var Purchase = require("../models/purchase");
const nodemailer = require("nodemailer");
var middleware = require("../middleware");


router.get("/", function(req, res){
	// Get all images from DB
	Image.find({featured: 'true'}, function(err, featuredImages){
		if(err){
			console.log(err);
		} else {
			res.render("landing",{images:featuredImages});

		}
	});
});

// ------------------------
// AUTH ROUTES
// ------------------------

router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var role = "User";
	User.register(new User({username:req.body.username, firstName:req.body.firstName, lastName:req.body.lastName, role:role}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			req.flash("error", err.message);
			return res.render("register");
		} 
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to Solivagus Photography, " + user.username);
			res.redirect("/");
		});
	});
});

router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/", 
	failureRedirect: "/login"
}), function(req, res){
	//nothing needed in callback
});

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success","You have been logged out.");
	res.redirect("/");
});

router.get("/about", function(req, res){
	res.render("about");
});

router.get("/portfolio", function(req, res){
	// Get all images from DB
	Image.find({}, function(err, allImages){
		if(err){
			console.log(err);
		} else {
			res.render("portfolio",{images:allImages});

		}
	});
});

router.get("/portfolio/:category", function(req, res){
	var filterCategory = "";
	switch(req.params.category.toUpperCase()) {
		case "PORTRAITS":
		filterCategory = "Portraits";
		break;
		case "ORIGINAL":
		filterCategory = "Original";
		break;
		case "REAL-ESTATE":
		filterCategory = "Real-Estate";
		break;
		default:
		// no default
	}
	Image.find({category: filterCategory}, function(err, allImages){
		if(err){
			console.log(err);
		} else {
			res.render("portfolio",{images:allImages});

		}
	});
});

router.get("/users/:id/album/:albumid", function(req, res){
	Image.find({"belongsToAlbum.id": req.params.albumid}, function(err, allImages){
		if(err){
			console.log(err);
		} else {
			console.log(allImages);
			res.render("albums/show",{images:allImages, currentUser_id:req.params.id});

		}
	});
});

router.get("/services", function(req, res){
	res.render("services");
});

router.get("/contact", function(req, res){
	res.render("contact");
});


router.post("/contact", middleware.sendMessage, function(req,res){

});


module.exports = router;