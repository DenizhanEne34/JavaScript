//This is my code for a receipt photo model used in our application.

const mongoose = require('mongoose');

const ReceiptPhotoSchema = new mongoose.Schema({
  transaction: {
    type: mongoose.Schema.ObjectId,
    ref: 'Transaction',
    required: true,
  },

  thumbnail: {
    type: String,
    required: [true, 'Please add a base64 string for the thumbnail photo.'],
  },

  original: {
    type: String,
    required: [true, 'Please add a base64 string for the original photo.'],
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReceiptPhotoSchema.pre('save', async function (next) {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('ReceiptPhoto', ReceiptPhotoSchema);
