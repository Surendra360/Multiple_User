var express = require('express');
var router = express.Router();
const userModel = require("../models/model")
const passport = require("passport")
const LocalStrategy = require("passport-local");
const { islogin } = require('../middleware/isLogedin');

passport.use(new LocalStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/register', function(req, res, next) {
  res.render('register', {user:req.user});
});

router.get('/login', function(req, res, next) {
  res.render('login', {user:req.user});
});

router.get("/profile", islogin, async(req,res)=>{
  res.render("profile", {user:req.user})
  
})

router.get("/contact", (req,res)=>{
  res.render("contact")
})

router.get("/logout",islogin, (req, res, next)=> {
  req.logout(()=>{
    res.redirect("/");
  });
});




router.post("/register", async(req,res,next)=>{
  try {
    const{ username, email,password, role} = req.body;
     await userModel.register({username, email, role}, password)
     res.redirect("/login")
    
  } catch (error) {
    console.log(error);
    
  }
})

router.post("/login", passport.authenticate("local", {failureRedirect: "/login"} ), async(req,res)=>{
  try {
    res.redirect("/profile")
    // res.send(`Welcome ${req.user.username}`);
  } catch (error) {
    console.log(error);
    
  }
})





module.exports = router;
