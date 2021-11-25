const express = require("express");
const router = express.Router();
const { room } = require("../controllers/public");
const Room = require("../models/room");
const { isLoggedIn } = require("../middleware/auth");
router.route("/create").get(room).post(isLoggedIn, async(req, res, next) => {
    try {
        const roomFounded = await Room.find({ owner: req.session.user._id });
        await Promise.all(roomFounded.map(async room => {
            await room.remove();
        }));
        const newRoom = new Room({
            code: new Date().getTime(),
            owner: req.session.user._id,
        });
        await newRoom.save();
        // res.render("home", {});
        console.log(newRoom);
    } catch (error) {
        next(error);
    }
});

module.exports = router;