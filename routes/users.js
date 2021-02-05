var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Album = require("../models/album");
var Image = require("../models/image");
var Purchase = require("../models/purchase");
const nodemailer = require("nodemailer");
var middleware = require("../middleware");

var bodyParser  	= require("body-parser")
router.use(bodyParser.urlencoded({extended:true}));


// ------------------------
// USER ROUTES
// ------------------------

router.get("/", function(req, res){
    // Get all users from DB
    User.find({}, function(err, allUsers){
     if(err){
       console.log(err);
     } else {
      res.render("users/index",{users:allUsers});
    }

  })
});

router.get("/:id/", function(req, res) {
 User.findById(req.params.id).exec(function(err, foundUser){
  if(err){
    console.log(err);
  } else {
    console.log(foundUser)
            //render show template with that user
            res.render("users/show", {currentUser: foundUser});
          }
        });
});

router.get("/:id/edit", function(req, res) {
 User.findById(req.params.id, function(err, foundUser){
  res.render("users/edit", {currentUser: foundUser});
});
});

router.patch("/:id", function(req, res) {
    // find and update the correct userreq.params.id, req.body.currentUser
    User.findByIdAndUpdate(req.params.id, req.body.currentUser, function(err, updatedUser){
     if(err){
       res.redirect("/");
     } else {
           //redirect somewhere(show page)
           console.log(updatedUser)
           res.redirect("/users/" + req.params.id);
         }
       });

  });

router.delete("/:id", function(req, res){
 User.findByIdAndRemove(req.params.id, function(err){
  if(err){
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});
});

module.exports = router;