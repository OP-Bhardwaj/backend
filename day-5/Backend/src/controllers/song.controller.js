const songModel = require('../models/song.model');
const storageService = require('../services/storage.service');
const id3 = require('node-id3');

async function uploadSong(req, res) {

  const songBuffer = req.file.buffer;
  const {mood} = req.body; // Get the mood from the request body

  const tags = id3.read(songBuffer);
  
  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      fileName: tags.title ? `${tags.title}.mp3` : req.file.originalname,
      folder: "/cohort2/moodify/songs",
    }),
    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      fileName: tags.title ? `${tags.title}.jpeg` : req.file.originalname,
      folder: "/cohort2/moodify/posters",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood: mood
  });

  res.status(201).json({ message: "Song created successfully", song }); // Add a response so Postman doesn't hang!
}

module.exports = {
  uploadSong
};