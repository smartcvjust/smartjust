const MiddleWareObj = require("../../../middleWare");

var express = require("express"),
    router = express.Router();



// about page
router.get("/about" , (req, res) => {
    res.render("sitePages/about/index");
});




module.exports = router;