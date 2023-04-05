const mongoose = require("mongoose");
const user = require("./userModel");
const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  title:{
    type:String,
    required:[true, "An event must have a title" ]
  },
  description: {
    type: String,
    trim: true,
  },
  locations: [
    {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
      day: Number,
    },
  ],
  locationTip: {
    type: String,
    default: "It is a lovely location",
  },
  eventType: {
    type: String,
    enum: ["physical", "virtual"],
    trim: true,
    require: [true, "Please select an event type"],
  },
  virtualMeetLink: {
    type: String,
    trim: true,
  },
  catergory: {
    type: String,
    enum: ["product lauch", "book review"],
    trim: true,
    require: [true, "Please select an catergory"],
  },
  customUrl: {
    type: String,
    trim: true,
  },
  frequency: {
    type: String,
    enum: ["single", "recurring"],
    trim: true,
  },
  startDate: [Date],
  // startTime: [Time],
  endDate: [Date],
  // endTime: [Time],
  twitter_url: {
    type: String,
    trim: true,
  },
  facebook_url: {
    type: String,
    trim: true,
  },
  instagram_url: {
    type: String,
    trim: true,
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
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
