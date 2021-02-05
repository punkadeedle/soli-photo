var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user");
var Album = require("../models/album");
var Image = require("../models/image");
var middleware = require("../middleware");


// ------------------------
// ALBUM ROUTES
// ------------------------

//Index - GET all instances
router.get("/", function(req, res){
    console.log(req.params.id)
    Album.find({"owner.id":req.params.id}, function(err, allAlbums){
        if(err){
            console.log(err);
        } else {
            res.render("albums/index",{albums:allAlbums, currentUser_id:req.params.id});
        }
    });
});

//New - GET form to create new instance
router.get("/new", function(req, res){
	res.render("albums/new", {currentUser_id:req.user._id}); 
});

//Create - POST new instance on form submit
router.post("/", function(req, res){
    var name = req.body.name;
    var owner = {
    	id: req.user._id,
        username: req.user.username
    }
    var newAlbum = {name:name, owner:owner}
    // Create a new campground and save to DB
    Album.create(newAlbum, function(err, createdAlbum){
    	if(err){
    		console.log(err);
    	} else {
            console.log(createdAlbum);
            res.redirect("/");
        }
    });
});

//Show - GET one instance
router.get("/:albumid/", function(req, res) {
	Album.findById(req.params.albumid).exec(function(err, foundAlbum){
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
router.get("/:albumid/edit", function(req, res) {
	Album.findById(req.params.albumid, function(err, foundAlbum){
		res.render("albums/edit", {currentAlbum: foundAlbum});
	});
});

//Update - PUT/PATCH edit instance on form submit
router.put("/:albumid/edit", function(req, res) {
    // find and update the correct campground
    Album.findByIdAndUpdate(req.params.albumid, req.body.currentAlbum, function(err, updatedAlbum){
    	if(err){
    		res.redirect("/");
    	} else {
           //redirect somewhere(show page)
           res.redirect("/albums/index" + req.params.id);
       }
   });

});

//Destroy - DELETE one instance
router.delete("/:id", function(req, res){
	Album.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/albums/index");
		} else {
			res.redirect("/albums/index");
		}
	});
});


module.exports = router;