const express = require("express");
const { User } = require("../models/user");
const router = express.Router();


router.route("/name").post(async(req, res, next) => {
    const { displayName } = req.body;
    // console.log(displayName);
    const { user } = req.session;
    const userFounded = await User.findOne({ _id: user._id });
    user.displayName = displayName;
    await userFounded.save();
    res.render("home", {
        user: req.flash("user")[0]
    });
});
module.exports = router;