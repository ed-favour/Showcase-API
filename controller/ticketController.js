const flutterwave = require("flutterwave-node-v3");
const flw = new flutterwave(
  process.env.FLUTTERWAVE_V3_PUBLIC_KEY,
  process.env.FLUTTERWAVE_SECRET_KEY
);
const Ticket = require("../models/ticketModel");
const TicketPayment = require("../models/ticketTransactionModel");
const Event = require('../models/eventModel')
const user = require('../models/userModel')
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createTicket = catchAsync(async (req, res, next) => {
// const newuser = await user.findOne({ _id: req.body.userId })
  const newTicket = await Ticket.create({
    userId: req.body.userId,
    eventId: req.body.eventId,
    ticketType:  req.body.ticketType,
    stock: req.body.stock
  });
  // const event = await Event.findOne({ _id: req.body.eventId });
  

  res.status(201).json({
    status: "success",
    data: {
      Ticket: newTicket,
    },
  });
});

exports.updateTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!ticket) {
    return next(new AppError("No Ticket found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      ticket,
    },
  });
});

exports.getTicket = catchAsync(async (req, res, next) => {
  //route handler is all the call back function
  const ticket = await Ticket.findById(req.params.id);
  // console.log(Ticket)

  if (!ticket) {
    return next(new AppError("No Ticket found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      ticket,
    },
  });
});


exports.deleteTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByIdAndDelete(req.params.id);

  if (!ticket) {
    return next(new AppError("No Ticket found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// exports.createTicketPayment = catchAsync(async (req, res, next) => {
//   const newTicketPayment = await TicketPayment.create(req.body);
//   res.status(201).json({
//     status: "success",
//     data: {
//       TicketPayment: newTicketPayment,
//     },
//   });
// });


exports.createTicketPayment = catchAsync(async (req, res, next) => {
  const newTicketPayment = await TicketPayment.create({
    ticketId: req.body.ticketId,
    amount: req.body.amount,
    paymentReference: "6578998999877",
    // email: req.body.email
  });
  const newuser = await user.findOne({  _id: req.body.userId  });
  const details = {
    card_number: "5531886652142950",
    cvv: "564",
    expiry_month: "09",
    expiry_year: "32",
    currency: "NGN",
    amount: Number(newTicketPayment.amount),
    // fullname: `${user.firstName} ${user.lastName}`,
    fullname: `izebhijie favour`,
    email: newuser.email,
    // email: "edith@gmail.com",
    tx_ref: "example01",
    enckey: process.env.FLUTTERWAVE_ENCRYPTION_KEY,
    authorization: {
      mode: "pin",
      pin: "3310",
    },
  };
  const response = await chargeCard(details);

  if (
    response?.status === "success" &&
    response?.data.amount === newTicketPayment.amount
  ) {
    const result = await TicketPayment.findOneAndUpdate(newTicketPayment._id, {
      paymentStatus: "successful",
    });
  } else {
    await TicketPayment.findOneAndUpdate(newTicketPayment._id, {
      paymentStatus: "failed",
    });
  }

  res.status(200).json({
    status: "success",
  });
});

const chargeCard = async (payload) => {
  try {
    const response = await flw.Charge.card(payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
