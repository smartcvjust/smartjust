var MiddleWareObj = {};

MiddleWareObj.checkLoggedInAndAdmin = (req , res, next) => {
    if(req.isAuthenticated()) {
        if(req.user.isAdmin) {
            return next();
        } else {
            return res.redirect("/");
        }
    } else {
        return res.redirect("/login");
    }
}

MiddleWareObj.checkUserLoggedIn = (req , res, next) => {
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()) {
        if(req.user.verified) {
            return next();
        } else {
            return res.redirect("/verify");
        }
        
    } else {
        return res.redirect("/login");
    }
}


 
module.exports = MiddleWareObj;