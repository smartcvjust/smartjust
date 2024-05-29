const MiddleWareObj = require("../../middleWare");
const cv = require("../../models/cv");
const user = require("../../models/user");

var express = require("express"),
    router = express.Router();



// about page
router.get("/dashboard", MiddleWareObj.checkLoggedInAndAdmin, (req, res) => {
    res.render("adminPages/index");
});


// users routes
router.get("/dashboard/users", MiddleWareObj.checkLoggedInAndAdmin, (req, res) => {
    user.find({}, (err, foundUsers) => {
        if(err) {
            console.log(err)
            req.flash("error", "Database error...")
            res.redirect("/") 
        } else {
            res.render("adminPages/users", {users: foundUsers});
        }
    })
});



router.post("/dashboard/delete/user/:id", MiddleWareObj.checkLoggedInAndAdmin, (req, res) => {
    user.findByIdAndDelete(req.params.id, (err, foundUser) => {
        if(err) {
            console.log(err)
            req.flash("error", "Database error...")
            res.redirect("/") 
        } else {
            req.flash("success", "Delete user successfully!")
            res.redirect("back");
        }
    })
});


// cv routes
router.get("/dashboard/cv-list", MiddleWareObj.checkLoggedInAndAdmin, (req, res) => {
    cv.find({}, (err, foundCvList) => {
        if(err) {
            console.log(err)
            req.flash("error", "Database error...")
            res.redirect("/") 
        } else {
            res.render("adminPages/cvList", {cvList: foundCvList});
        }
    })
});
router.post("/dashboard/delete/cv/:id", MiddleWareObj.checkLoggedInAndAdmin, (req, res) => {
    cv.findByIdAndDelete(req.params.id, (err, foundCV) => {
        if(err) {
            console.log(err)
            req.flash("error", "Database error...")
            res.redirect("/") 
        } else {
            req.flash("success", "Delete CV successfully!")
            res.redirect("back");
        }
    })
});





module.exports = router;