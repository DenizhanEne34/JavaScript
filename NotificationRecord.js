const mongoose = require('mongoose');

const NotificationRecordSchema = new mongoose.Schema({
  user: {
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },

  code: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  channel: {
    type: String,
    required: true,
  },

  isSent: {
    type: Boolean,
    default: false,
  },

  message: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('NotificationRecord', NotificationRecordSchema);
