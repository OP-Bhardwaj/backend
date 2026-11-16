const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  url: {
    type: String,
    required: [true, 'Audio URL is required'],
  },
  posterUrl: {
    type: String,
    required: [true, 'Poster URL is required'],
  },
  mood: {
    type: String,
    enum: {
      values: ['happy', 'sad', 'surprised'],
      message: '{VALUE} is not a valid mood',
    },
  },
});

const songModel = mongoose.model('songs', songSchema);

module.exports = songModel;