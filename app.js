
require('dotenv').config();
const path = require('path');
var express                      = require("express"),
    app                          = express(),
    bodyParser                   = require("body-parser"),
    overrideMethod               = require("method-override"),
    flash                        = require('connect-flash'),
    mongoose                     = require("mongoose"),
    // auth
    passport                     = require("passport"), 
    LocalStrategy                = require("passport-local"),
    passportLocalMongoose        = require("passport-local-mongoose"),
    user                         = require("./models/user"),
    // admin
    dashboardRouter              = require("./routes/admin/dashboard"),
    // site
    homeRouter                   = require("./routes/site/home/index"),
    aboutRouter                  = require("./routes/site/about/index"),
    profileRouter                = require("./routes/site/profile/index"),
    cvListRouter                 = require("./routes/site/cvList/index"),
    authRouter                   = require("./routes/site/auth/index"),
    errorRouter                  = require("./routes/site/error/index");
    


 
mongoose.connect("mongodb+srv://smartcvmatchingjust:12345@cluster0.fh5dpc2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {useNewUrlParser: true, useUnifiedTopology: true  });

app.set("view engine" , "ejs");
app.use("/assets" , express.static("assets"));


app.use(bodyParser.urlencoded({extended: true}));
app.use(overrideMethod("_method"));
app.use(flash());


// setup auth
app.use(require("express-session")({ 
    secret: "write any thing",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser()); 

   


app.use( (req , res, next) => {
    res.locals.moment = require("moment");
    res.locals.currentUser = req.user;     
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success"); 
    return next();
});

// site pages
app.use(homeRouter);
app.use(aboutRouter)
app.use(profileRouter);
app.use(cvListRouter)
app.use(authRouter);
// admin pages
app.use(dashboardRouter)
 


app.use(errorRouter);
   


const port = process.env.PORT || 9999;
app.listen(port , function(){
    console.log("Server is Ready......");
});