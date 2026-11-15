const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,    
    required: [true, 'Title is required'],
  },
  posterUrl: {
    type: String,
    required: [true, 'Poster URL is required'],
  },
  titleUrl: {
    type: String,
    required: [true, 'Title URL is required'],
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'surprised'], // Example moods, adjust as needed
    message: 'Enum this is ',
  }
})

const songModel = mongoose.model('songs', songSchema);

module.exports = songModel;