const express = require('express');
const app = express(); // config server
const path = require("path");
const flash = require("connect-flash");
const db = require("./configs/db"); // connect db
db.connectDB(); // connect db
const session = require('express-session');
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const routerConfig = require("./routers/index"); // import external file 
const fileRouter = require("./routers/file");
const userRouter = require("./routers/user");
const roomRouter = require("./routers/rooms");

// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/node_modules/socket.io/client-dist"));

app.use(logger(':method :url :status :res[content-length] - :response-time ms'));

// create way connect to webSocket

const cors = require('cors');
const socket = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socket(server, {
    cors: {
        methods: ['get', 'post'],
        origin: '*'
    }
});


// another way to connect init socketServer

// const http = require('http')
// const server = http.createServer(app)
// const { Server } = require('socket.io')
// const io = new Server(server, {
//     cors: {
//         methods: ['get', 'post'],
//         origin: '*'
//     }
// });
server.listen(1234, () => {
    console.log('port 1234');
});


io.on('connection', (socket) => {
    //console.log(` connected socketId: `, socket.id);
    socket.emit('setInstanceId', { id: socket.id });
    socket.on('startDraw', (res) => {
        io.emit('sendDrawStart', {...res, id: socket.id });
    });
    socket.on("Drawing", (res) => {
        io.emit('sendDrawing', {...res, id: socket.id });
    });
    socket.on('stopDraw', (res) => {
        io.emit('stopFromServer', res);
    });
    socket.on('message', (res) => {
        io.emit('messFromServer', {...res, id: socket.id });
    });
    // socket.on("undo", (res) => {
    //     io.emit('undoFromServer', res);
    // });
});

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
app.use("/rooms", roomRouter);
app.use("/update", userRouter);

// handle error
app.use(function(req, res, next) {
    next();
});
app.use(function(error, req, res, next) {
    console.log(error);
    res.render("error");
});

module.exports = app;