const express = require('express');
const router = express.Router();
const { shower, register, login, home } = require("../controllers/public.js");
const { User } = require('../models/user.js');
const { isLoggedIn } = require("../middleware/auth");

router.route("/").get(shower);

router.route("/register").get(register)
    .post(async function(req, res, next) {
        try {
            const { email, password, rePassword } = req.body;
            //console.log(req.body);
            if (!email || !password || !rePassword) {
                req.flash("error", "Email, Password, rePassword are required !");
                res.redirect("register");
                // console.log("Email, Password, rePassword are required !");
                return false;
            }

            const user = await User.findOne({ email });
            if (user) {
                req.flash("error", "Email is already in use !");
                // console.log("error", "Email is already in use !");
                res.redirect("register");
                return false;
            }

            const newUser = await new User({ email, password });
            // console.log(newUser);
            await newUser.save();
            res.redirect("login");
        } catch (error) {
            next(error);
        }
    });
router.route("/login").get(login)
    .post(async function(req, res, next) {
        try {
            const { email, password } = req.body;
            //console.log(req.body);
            if (!email || !password) {
                req.flash("error", "Email or Password is invalid!");
                res.redirect("login");
                // console.log("Email, Password, rePassword are required !");
                return false;
            }
            const user = await User.findOne({ email, password }).lean();

            if (!user) {
                req.flash("error", "Email or Password is incorrect");
                console.log("false");
                res.redirect("login");
                return false;
            }
            delete user.password;
            delete user.__v;

            req.session.user = user;
            req.flash("user", req.session.user);
            res.redirect("home");
        } catch (error) {
            next(error);
        }
    });

router.route("/home").get(isLoggedIn, home);
module.exports = router;