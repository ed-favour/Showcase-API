const mongoose = require("mongoose");
const event = require("./eventModel");
const user = require("./userModel");

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: event,
    required: true,
  },
  firstName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    require: [true, "Please tell us your name!"],
    trim: true,
  },
  lastName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    require: [true, "Please tell us your name!"],
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },
  ticketType: {
    type: String,
    enum: ["free", "paid", "invite_only"],
    required: true,
  },
  stock: {
    type: String,
    enum: ["limited", "unlimited"],
    trim: true,
  },
  numberOfStock: {
    type: Number,
  },
  purchaseLimit: {
    type: Number,
  },
  price: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
},
    {toJSON:{virtuals: true}}
);

// Define the virtual property 'fullName'
ticketSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
