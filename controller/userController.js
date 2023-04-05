const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const {ObjectId} = require('mongodb')

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
   
    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }
  
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  });

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  // user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
