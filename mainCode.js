//This repository contains some of the code I wrote at my previous internship as a Back End Developer at Maxitech. 
//These are a small sample but somehow represents what my overall code structure looked like.

// These are some code snippets from the 2 projects I completed at my internship

const sendPeriodicSummariesAsync = async (period) => {
  const allUsers = await User.find({});
  let pushSuccess = 0;
  let pushFails = 0;
  let emailSuccess = 0;
  let emailFails = 0;

  for (const user of allUsers) {
    const config = await getNotificationsConfiguration(user, 'REPORTS');

    if (period == 'weekly') {
      const lastWeekToday = moment().subtract(7, 'days').startOf('day');
      const lastNight = moment().subtract(1, 'days').endOf('day');

      if (config.push == true) {
        (await sendWeeklySummaryPushNotification(
          user,
          config.token,
          lastWeekToday,
          lastNight
        ).isSent)
          ? pushSuccess++
          : pushFails++;
      }
      if (config.email == true) {
        (
          await sendWeeklySummaryEmail(
            user,
            user.email,
            lastWeekToday,
            lastNight
          )
        ).isSent
          ? emailSuccess++
          : emailFails++;
      }
    }
    if (period == 'monthly') {
      if (config.push == true) {
        (await sendMonthlySummaryPushNotification(user, config.token).isSent)
          ? pushSuccess++
          : pushFails++;
      }

      if (config.email == true) {
        (await sendMonthlySummaryEmail(user, user.email).isSent)
          ? emailSuccess++
          : emailFails++;
      }
    }
  }

  let code = '';
  if (period == 'weekly') {
    code = notificationCode.weekly_summary;
  } else {
    code = notificationCode.monthly_summary;
  }

  logger.info(
    `${code} batch notification process is complete: ${
      emailSuccess + emailFails
    } emails were processed, ${emailSuccess} was successfully sent, ${emailFails} was failed to be sent. ${
      pushSuccess + pushFails
    } push 
    notifications were processed, ${pushSuccess} was successfully sent, ${pushFails} was failed to be sent`
  );
};


 if (req.body.receipts != null) {
    const receipts = req.body.receipts;

    const receiptsDB = await ReceiptPhoto.find({
      transaction: transaction._id,
    });

    for (let receipt of receipts) {
      if (!receipt._id) {
        receipt.transaction = transaction;
        receipt = await ReceiptPhoto.create(receipt);
      }
    }

    for (let dbReceipt of receiptsDB) {
      var found = receipts.find((e) => e._id == dbReceipt._id);
      if (!found) {
        await dbReceipt.remove();
      }
    }
  }


// // // // // // // // // // // // // // // // // // // // // // // // // //
exports.updateTransaction = asyncHandler(async (req, res, next) => {
  let transaction = await Transaction.findOne(getIdQuery(req.params.id))
    .populate('taxCategory')
    .populate('spendingCategory');

  // A lot of lines in between
  //
  //
  
 if (req.body.receipts != null) {
    const receipts = req.body.receipts;

    const receiptsDB = await ReceiptPhoto.find({
      transaction: transaction._id,
    });

    for (let receipt of receipts) {
      if (!receipt._id) {
        receipt.transaction = transaction;
        receipt = await ReceiptPhoto.create(receipt);
      }
    }

    for (let dbReceipt of receiptsDB) {
      var found = receipts.find((e) => e._id == dbReceipt._id);
      if (!found) {
        await dbReceipt.remove();
      }
    }
  }

  const newTransaction = await transaction.save();

  if (req.body.from == 'onboarding') {
    user.recordActivity(`ONBOARDING-CLASSIFY`, transaction.id, req.body);
  } else {
    user.recordActivity(
      `TRANSACTION${operationName}`,
      transaction.id,
      req.body
    );
  }

  res.status(200).json({
    success: true,
    data: this.transactionToDTO(newTransaction),
  });
});


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

