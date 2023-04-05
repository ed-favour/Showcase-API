const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
exports.userSignup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName:  req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      country: req.body.country,
      accountType: req.body.accountType
    });
  
    const token = signToken(newUser._id);
  
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  });

  exports.organizationSignup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      businessName: req.body.businessName,
      email: req.body.email,
      password: req.body.password,
      country: req.body.country,
      accountType: req.body.accountType
    });
  
    const token = signToken(newUser._id);
  
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  });

  exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError(`Please provide email and password`, 400));
    }
  
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('incorrect email or password', 401));
    }
  
    // 3) If everything ok, send token to client
    const token = signToken(user._id);
  
    res.status(200).json({
      status: 'success',
      token,
    });
  });

