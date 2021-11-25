const express = require("express");
const { home } = require("../controllers/public");
const { User } = require("../models/user");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");

router.route("/name").get(isLoggedIn).post(async(req, res, next) => {
    const { displayName } = req.body;
    // console.log(displayName);
    const { user } = req.session;
    const userFounded = await User.findOne({ _id: user._id });
    userFounded.displayName = displayName;
    await userFounded.save();
    req.session.user = userFounded;
    req.flash("user", req.session.user);
    res.render("home", {
        user: req.flash("user")[0],
    });
});
module.exports = router;