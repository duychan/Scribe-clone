const express = require('express');
const router = express.Router();
const { shower, register, login } = require("../controllers/public.js");
const { User } = require('../models/user.js');

router.route("/").get(shower);
router.route("/login").get(login);
router.route("/register").get(register)
    .post(async function(req, res, next) {
        try {
            const { email, passWord, rePassword } = req.body;
            if (!email || !passWord || !rePassword) {
                req.flash("error", "Email, Password, rePassword are required !");
                res.render("register");
                return false;
            }

            const user = await User.findOne({ email });
            if (user) {
                req.flash("error", "Email is already in use !");
                res.render("register");
                return false;
            }
            const newUser = await new User({ email, passWord });
            await newUser.save();
            res.send("ok");
        } catch (error) {
            next(error);
        }
    });
module.exports = router;