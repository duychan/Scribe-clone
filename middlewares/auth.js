// require login before
const isLoggedIn = function(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
};
module.exports = {
    isLoggedIn,
};