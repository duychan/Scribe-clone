const shower = function(req, res) {
    //console.log('home page');
    res.render("index", {
        title: "play"
    });
};
const register = function(req, res) {
    res.render("register");
};
const login = function(req, res) {
    res.render("login");
};
const upload = function(req, res) {
    res.render("a");
};
const home = (req, res, next) => {
    res.render("home", {
        user: req.flash("user")[0],
    });
};
const room = (req, res, next) => {
    res.render("room");
}
module.exports = {
    shower,
    register,
    login,
    upload,
    home,
    room,
};