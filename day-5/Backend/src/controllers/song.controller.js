const songModel = require('../models/song.model');

async function createSong(req, res) {
  console.log(req.file); // Log the uploaded file information   
}


module.exports = {
  uploadSong
};