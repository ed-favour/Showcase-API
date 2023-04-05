const Events = require("../models/eventModel");
const  Ticket = require('../models/ticketModel')
const User = require('../models/userModel')
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createEvent = catchAsync(async (req, res, next) => {
  const newEvent = await Events.create({
    userId: req.body.userId,
    title: req.body.title,
    eventType:  req.body.eventType,
    category: req.body.category
  });
  res.status(201).json({
    status: "success",
    data: {
      event: newEvent,
    },
  });
});

exports.getAllEvent = catchAsync(async (req, res, next) => {
  const newEvent = await Events.find();
  res.status(200).json({
    status: "success",
    data: {
      newEvent,
    },
  });
});

exports.getEvent = catchAsync(async (req, res, next) => {
  //route handler is all the call back function
  const events = await Events.findById(req.params.id);
  // console.log(Events)

  if (!events) {
    return next(new AppError("No Events found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      events,
    },
  });
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  const event = await Events.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }
  );

  if (!event) {
    return next(new AppError("No Event found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Events.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(new AppError("No Event found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
