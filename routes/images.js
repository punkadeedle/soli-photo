var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Album = require("../models/album");
var Image = require("../models/image");
var Purchase = require("../models/purchase");
var middleware = require("../middleware");


// ------------------------
// ALBUM ROUTES
// ------------------------

//Index - GET all instances
router.get("/", function(req, res){
    Album.find({}, function(err, allAlbums){
    	if(err){
    		console.log(err);
    	} else {
                res.render("albums/index",{albums:allAlbums});
    	}
    });
});

//New - GET form to create new instance
router.get("/new", function(req, res){
	res.render("albums/new"); 
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
    var newAlbum = {name: name, image: image, description: desc, author:author}
    // Create a new campground and save to DB
    Album.create(newAlbum, function(err, createdAlbum){
    	if(err){
    		console.log(err);
    	} else {
            //redirect back to campgrounds page
            console.log(createdAlbum);
            res.redirect("/albums/index");
        }
    });
});

//Show - GET one instance
router.get("/albums/:id/", function(req, res) {
	Album.findById(req.params.id).exec(function(err, foundAlbum){
		if(err){
			console.log(err);
		} else {
			console.log(foundAlbum)
            //render show template with that campground
            res.render("album/show", {currentAlbum: foundAlbum});
        }
    });
});


//Edit - GET form to edit one instance
router.get("/albums/:id/edit", function(req, res) {
	Album.findById(req.params.id, function(err, foundAlbum){
		res.render("albums/edit", {currentAlbum: foundAlbum});
	});
});

//Update - PUT/PATCH edit instance on form submit
router.put("/albums/:id/edit", function(req, res) {
    // find and update the correct campground
    Album.findByIdAndUpdate(req.params.id, req.body.currentAlbum, function(err, updatedAlbum){
    	if(err){
    		res.redirect("/");
    	} else {
           //redirect somewhere(show page)
           res.redirect("/albums/index" + req.params.id);
       }
   });

});

//Destroy - DELETE one instance
router.delete("/albums/:id", function(req, res){
	Album.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/albums/index");
		} else {
			res.redirect("/albums/index");
		}
	});
});


module.exports = router;