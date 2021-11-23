const express = require('express');
const app = express(); // config server
const routerConfig = require("./routers"); // import external file 
const fileRouter = require("./routers/file");
const path = require("path");
const flash = require("connect-flash");
const db = require("./configs/db"); // connect db
db.connectDB(); // connect db
const session = require('express-session');
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger());
// parser body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "mit",
    saveUninitialized: true,
    resave: false,
    cookie: { httpOnly: true, expires: 60 * 60 * 24 },
}));
app.use(flash());
app.use(function(req, res, next) {
    res.locals.error_mess = req.flash("error");
    res.locals.success_mess = req.flash("success");
    res.locals.warning_mess = req.flash("warning");
    next();
})
app.use("/", routerConfig); // need a router
app.use("/upload", fileRouter);
// handle error
app.use(function(req, res, next) {
    next();
});
app.use(function(error, req, res, next) {
    console.log(error);
    res.render("error");
});

module.exports = app;