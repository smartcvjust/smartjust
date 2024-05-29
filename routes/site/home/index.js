const MiddleWareObj = require("../../../middleWare");

var express = require("express"),
    router = express.Router();



// home page
router.get("/" , (req, res) => {
    res.render("sitePages/home/index");
});



module.exports = router;