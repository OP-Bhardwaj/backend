const express = require('express');
const router = express.Router();
const upload = require("..//middlewares/upload.middleware.js");
const songController = require('../controllers/song.controller.js');


router.post("/", upload.single("song"), songController.uploadSong);

module.exports = router;