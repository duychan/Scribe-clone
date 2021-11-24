const express = require("express");
const multer = require("multer");
const router = express.Router();
const medias = multer({ dest: "medias/" });
const { upload } = require("../controllers/public.js");
router.route("").post(medias.single("avatar"), function(req, res) {
    console.log("hello");
});

// config uploads file

module.exports = router;