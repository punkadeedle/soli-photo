var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Image = require("../models/image");
const nodemailer = require("nodemailer");


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


router.get("/services", function(req, res){
	res.render("services");
});

router.get("/contact", function(req, res){
	res.render("contact");
});


router.post("/contact", sendMessage);

function sendMessage(req, res) {
	var transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		secureConnection: true,
		port: 465,
		service: "gmail",
		auth: {
			user: process.env.NODEMAILER_ADDRESS,
			pass: process.env.NODEMAILER_PASSKEY
		}
	})
	var messageText = 'New contact messsage from <b>'+req.body.contact.name+"</b>: "+req.body.contact.message
	var mailOptions = {
		from: process.env.NODEMAILER_ADDRESS,
		to: process.env.NODEMAILER_ADDRESS,
		subject: "SolivagusPhoto- " + req.body.contact.subject,
		//text: req.body.contact.message,
		html: messageText
	}
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			req.flash("error","There was a problem sending you message.  Please try again later.");
			res.redirect("/contact");
		} else {
			req.flash("success","Thank you for your message.");
			res.redirect("/contact");
		}
	})
	
};


module.exports = router;