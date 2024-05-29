const MiddleWareObj = require("../../../middleWare");
const cv = require("../../../models/cv");
const user = require("../../../models/user");

var express = require("express"),
    router = express.Router();



// home page
router.get("/profile" , MiddleWareObj.checkUserLoggedIn, (req, res) => {
   
    cv.find({addedBy: req.user._id} , (err, foundCvList) => {
        if(err) {   
            console.log(err)
            req.flash("error", "Database error...")
            res.redirect("/")
        } else {
            res.render("sitePages/profile/index", {cvList: foundCvList});
        }
    }) 

    
   
});



router.put("/profile" , MiddleWareObj.checkUserLoggedIn, (req, res) => {
   
    user.findById(req.user._id , (err, foundUser) => {
        if(err) {
            console.log(err)
            req.flash("error", "Database error...")
            res.redirect("/")
        } else {
            foundUser.email = req.body.email;
            foundUser.gender = req.body.gender;
            foundUser.save();
            req.flash("success", "Update profile successfully")
            res.redirect("back");
        }
    }) 
   
});


router.put("/profile/change-password" , MiddleWareObj.checkUserLoggedIn, (req, res) => {
   
    user.findById(req.user._id, (err, user) => {
        if (err) {
            req.flash("error", "Something went wrong. Please try again.");
            return res.redirect("back");
        }

        // Check if the current password matches
        user.authenticate(req.body.currentPassword, (err, isValid) => {
            if (err || !isValid) {
                req.flash("error", "Current password is incorrect.");
                return res.redirect("back");
            }

            if(req.body.newPassword == req.body.confirmPassword) {
                // Update the password with the new one
                user.setPassword(req.body.newPassword, (err) => {
                    if (err) {
                        req.flash("error", "Something went wrong. Please try again.");
                        return res.redirect("back");
                    }
                     
                    user.save((err) => {
                        if (err) {
                            req.flash("error", "Something went wrong. Please try again.");
                            return res.redirect("back");
                        }

                        req.flash("success", "Password has been changed successfully.");
                        
                        return res.redirect("back");
                    });
                }); 
            } else {
                req.flash("error", "Passwords must be matched.");
                return res.redirect("back");
            }

            
        });
    });
   
});
module.exports = router;