const shower = function(req, res) {
    //console.log('home page');
    res.render("index.ejs");
};
const register = function(req, res) {
    res.render("register");
};
const login = function(req, res) {
    res.render("login");
};
module.exports = {
    shower,
    register,
    login,
};