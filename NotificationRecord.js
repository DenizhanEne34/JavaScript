//This is my code for creating a NotificationRecord model to track notification success in our weekly and 
//monthly email and push notifications. My model had 6 fields: a user object field which holds a unique user token (to connect the nofitication to the user)
//, a code field which holds the period of the Notification, it can be a weekly, monthly, or quarterly notifications, a createdAt field, a channel field which can hold 
// either push or email. isSent is the key field on my model that allows me to check if a notification has been successfully sent or not, and the last
//field is an error message field.


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
