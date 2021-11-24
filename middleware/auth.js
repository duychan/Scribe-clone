// require login before
const isLoggedIn = function(req, res, next) {
    if (req.session && req.session.user) {
        req.flash("user", req.session.user);
        next();
    } else {
        res.redirect("/login");
        console.log("null session");
    }
};
module.exports = {
    isLoggedIn,
};