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
  }
})

const songModel = mongoose.model('songs', songSchema);

module.exports = songModel;