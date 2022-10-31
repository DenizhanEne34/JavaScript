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
