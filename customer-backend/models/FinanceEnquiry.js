const mongoose = require("mongoose");

const financeEnquirySchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["finance", "insurance"],
      required: true
    },

    vehicleType: {
      type: String,
      required: true
    },

    rcNumber: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

const FinanceEnquiry = mongoose.model(
  "FinanceEnquiry",
  financeEnquirySchema
);

module.exports = FinanceEnquiry;