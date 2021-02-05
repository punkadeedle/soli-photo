var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Image = require("../models/image");
var Purchase = require("../models/purchase");
var middleware = require("../middleware");


// ------------------------
// PURCHASE ROUTES
// ------------------------

//Index - GET all instances
router.get("/", function(req, res){
    Purchase.find({}, function(err, allPurchases){
    	if(err){
    		console.log(err);
    	} else {
                res.render("purchases/index",{purchases:allPurchases});
    	}
    });
});

//New - GET form to create new instance
router.get("/new", function(req, res){
	res.render("purchases/new"); 
});

//Create - POST new instance on form submit
router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
    	id: req.user._id,
    	username: req.user.username
    }
    var newPurchase = {name: name, image: image, description: desc, author:author}
    // Create a new campground and save to DB
    Purchase.create(newPurchase, function(err, createdPurchase){
    	if(err){
    		console.log(err);
    	} else {
            //redirect back to campgrounds page
            console.log(createdPurchase);
            res.redirect("/purchases/index");
        }
    });
});

//Show - GET one instance
router.get("/:id/", function(req, res) {
	Purchase.findById(req.params.id).exec(function(err, foundPurchase){
		if(err){
			console.log(err);
		} else {
			console.log(foundPurchase)
            //render show template with that campground
            res.render("album/show", {currentPurchase: foundPurchase});
        }
    });
});


//Edit - GET form to edit one instance
router.get("/:id/edit", function(req, res) {
	Purchase.findById(req.params.id, function(err, foundPurchase){
		res.render("purchases/edit", {currentPurchase: foundPurchase});
	});
});

//Update - PUT/PATCH edit instance on form submit
router.put("/:id/edit", function(req, res) {
    // find and update the correct campground
    Purchase.findByIdAndUpdate(req.params.id, req.body.currentPurchase, function(err, updatedPurchase){
    	if(err){
    		res.redirect("/");
    	} else {
           //redirect somewhere(show page)
           res.redirect("/purchases/index" + req.params.id);
       }
   });

});

//Destroy - DELETE one instance
router.delete("/:id", function(req, res){
	Purchase.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/purchases/index");
		} else {
			res.redirect("/purchases/index");
		}
	});
});



module.exports = router;