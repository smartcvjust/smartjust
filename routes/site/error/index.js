var express = require("express"),
    router = express.Router();



// home page
router.get("*" , (req, res) => {
    res.render("sitePages/error/index");
});


module.exports = router;