const songModel = require('../models/song.model');
const storageService = require('../services/storage.service');
const id3 = require('node-id3');

async function uploadSong(req, res) {
  const songBuffer = req.file.buffer;
  const { mood } = req.body;

  const tags = id3.read(songBuffer);
  const title = tags.title || req.file.originalname.replace(/\.[^/.]+$/, '');

  const uploadTasks = [
    storageService.uploadFile({
      buffer: songBuffer,
      fileName: `${title}.mp3`,
      folder: "/cohort2/moodify/songs",
    }),
  ];

  if (tags.image && tags.image.imageBuffer) {
    uploadTasks.push(
      storageService.uploadFile({
        buffer: tags.image.imageBuffer,
        fileName: `${title}.jpeg`,
        folder: "/cohort2/moodify/posters",
      })
    );
  }

  const [songFile, posterFile] = await Promise.all(uploadTasks);

  const song = await songModel.create({
    title: title,
    url: songFile.url,
    posterUrl: posterFile ? posterFile.url : "https://ik.imagekit.io/your_id/default-poster.jpg",
    mood: mood,
  });

  res.status(201).json({ message: "Song created successfully", song });
}

async function getSongs(req, res) {
  const { mood } = req.query;

  const song = await songModel.findOne({ mood });

  res.status(200).json({
    message: "Songs fetched successfully",
    song,
  });
}

module.exports = {
  uploadSong,
  getSongs,
};