const User = require("../models/user.js");
module.exports.signupRender = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async (req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err) => {
        if(err){
           return next(err);
        }
        req.flash("success","Welcome to Geo explorer");
        res.redirect("/listings");
    });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
   
};

module.exports.login = (req,res)=>{
     res.render("users/login.ejs");
};

module.exports.loginRender = async (req,res)=>{
    console.log("Authentication succesfull");
    req.flash("success","Welcome back to Geo explorer");
    let redirectUrl = res.locals.redirect || "/listings";
    res.redirect(redirectUrl);
    // try{
    //     let {username,password} = req.body;
    //     const newUser = new User({email,username});
    //     await User.register(newUser,password);
    //     req.flash("success","Welcome to geo explorer ");
    //     res.redirect("/listings");
    // }catch(e){
    //     req.flash("error",e.message);
    //     res.redirect("/signup");
    // }
};

module.exports.logout = (req,res)=>{
    req.logout((err) => {
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
};