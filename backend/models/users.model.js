const mongoose = require('mongoose');

// Needed to define the schema for a "table"
const Schema = mongoose.Schema;

const employeeName = new Schema({
  firstName: {
    type: String
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String
  }
});

const employeeAddress = new Schema({
  streetAddress: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: Number
  }
});

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  title: {
    type: String,
    enum: ['President', 'Chief Financial Officer', 'Office Personnel'],
    required: true
  },
  fullName: employeeName,
  address: employeeAddress,
  payRate: {
    type: Number
  },
  tenure: {
    type: Number
  }
  
}, {
  timestamps: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;