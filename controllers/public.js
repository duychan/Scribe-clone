const shower = function(req, res) {
    //console.log('home page');
    res.render("index");
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
module.exports = {
    shower,
    register,
    login,
    upload,
};