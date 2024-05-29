const MiddleWareObj = require("../../../middleWare");
const user = require("../../../models/user");

var express = require("express"),
    router = express.Router(),
    passport = require("passport");

    var nodemailer = require('nodemailer');

    


      async function sendVerificationEmail(userEmail, userName, verificationCode) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'smartcvmatching.just@gmail.com',
              pass: 'unpzidehhplbcrbt'
            }
        });
      
        let mailOptions = {
          from: 'Smart CV Matching <smartcvmatching.just@gmail.com>',
          to: userEmail,
          subject: 'Your Verification Code',
          html: `
            <p>Hi ${userName},</p>
            <p>Thank you for registering with <strong>Smart CV Matching</strong>!</p>
            <p>To complete your registration, please use the verification code below:</p>
            <h2>${verificationCode}</h2>
            <p>Please enter this code in the verification form to verify your account. This helps us ensure the security and integrity of our platform.</p>
            <p>If you did not request this verification code, please ignore this email.</p>
            <p>Thank you for your cooperation!</p>
            <p>Best regards,</p>
          `
        };
      
        try {
          let info = await transporter.sendMail(mailOptions);
          console.log('Email sent: ' + info.response);
        } catch (error) {
          console.error('Error sending email: ' + error);
        }
      }





router.get("/register" , (req , res) => {
    res.render("sitePages/auth/register");
});

router.get("/login" , (req , res) => {
    res.render("sitePages/auth/login");
});

function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

router.post("/register" , function(req,res) { // this is a route when you save a register info in the DB
    // User is the model name of userSchema
   
    if(req.body.password == req.body.confirmPassword) {
        
        if(req.body.password.length < 8) {
            req.flash("error", "Passwords must be at least 8 characters!");
            res.redirect("back")
        } else {

            const vCode = generateVerificationCode();
            sendVerificationEmail(req.body.email, req.body.username, vCode)


            user.register( new user({username: req.body.username, verificationCode: vCode, email: req.body.email, gender: req.body.gender } ) , req.body.password , function(err , user){
                if(err) {
                    console.log(err);
                    req.flash("error", "Username already exsist!! try another one")
                    return res.redirect("/register"); // if error stay in a register page
                }
                
                passport.authenticate("local")(req , res , () => {
                    // in this line select a redirect page going after register successfully
                    req.flash("success", "Register Successfully")
                    res.redirect('/login');
                });
            });
        } 
        
    } else {
        req.flash("error", "Passwords must be match!");
        res.redirect("back")
        
    }
    
}); 

router.post("/login" , passport.authenticate("local" , {
        successRedirect: "/success-login", //redirect pageGoal when login success
        failureRedirect: "/failure-login" //redirect login page when login failure
   }) ,function(req , res){
    // this function empty for now
});


router.get("/success-login" , (req , res) => {
    if(req.user.isAdmin) {
        res.redirect('/dashboard');
    } else {
        res.redirect("/my-cv-list");
    }
});


router.get("/failure-login" , (req , res) => {
    req.flash("error", "Username or password incorrect")
    res.redirect("/login");
});

router.get("/verify" , (req , res) => {
    res.render("sitePages/auth/verify");
});


router.post("/verify", (req , res) => {
    user.findById(req.user._id, (err, foundUser) => {
        if(err) {
            console.log(err);
            req.flash("error", "DB Error")
            return res.redirect("/"); // if error stay in a register page
        } else {
            if(req.body.code.length != 6) {
                req.flash("error", "The verification code must be 6 charaters")
                res.redirect("back")
            } else {
                if(foundUser.verificationCode != req.body.code) {
                    req.flash("error", "Verification code incorrect")
                    res.redirect("back")
                } else {
                    foundUser.verified = true;
                    foundUser.save();
                    req.flash("success", "Congrats, You're now verified!")
                    res.redirect('/my-cv-list')
                }
                
            }
        }
    })
});


router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });


module.exports = router; 