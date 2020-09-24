const mongoose = require('mongoose');

// Needed to define the schema for a "table"
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  title: {
    type: String,
    enum: ['President', 'Chief Financial Officer', 'Office Personnel'],
    required: true,
    unique: true,
    trim: true
  }/*
  id_num: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: "true",
    first_name: {
        type: String,
        trim: true,
        minlength: 2
    },
    middle_name: {
        type: String,
        trim: true,
    },last_name: {
        type: String,
        trim: true,
        minlength: 3
    }
    
  }
  */
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;