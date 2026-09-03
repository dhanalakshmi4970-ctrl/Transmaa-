const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },

  fromLocation: {
    type: String,
    required: true
  },

  toLocation: {
    type: String,
    required: true
  },

  pickupDate: {
    type: String,
    required: true
  },

  pickupTime: {
    type: String,
    required: true
  },

  goodsCategory: {
    type: String,
    default: "General Goods"
  },

  loadWeight: {
    type: String,
    default: ""
  },

  expectedTransportationCost: {
    type: Number,
    required: true,
    default: 0
  },

  description: {
    type: String,
    default: ""
  },

  specialInstructions: {
    type: String,
    default: ""
  },

  truckType: {
    type: String,
    default: "Pickup Truck"
  },

  status: {
    type: String,
    default: "Pending Verification"
  },

  currentStage: {
    type: Number,
    default: 1
  },

  estimatedFare: {
    type: Number,
    default: 0
  },

  distanceKm: {
    type: Number,
    default: 0
  },

  createdDate: {
    type: String,
    required: true
  },

  driverDetails: {
    name: String,
    phone: String,
    vehicleNumber: String,
    rating: String
  }

});

const Booking = mongoose.model(
  "Booking",
  bookingSchema
);

module.exports = Booking;