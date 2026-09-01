require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Customer = require("./models/Customer");
const Booking = require("./models/Booking");
const FinanceEnquiry = require("./models/FinanceEnquiry");

const app = express();
const PORT = 5000;

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// MONGODB CONNECTION
// =========================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {
  res.send("Transmaa Backend is running!");
});

// =========================
// CUSTOMER LOGIN
// =========================

app.post("/api/login", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        message: "Phone number is required"
      });
    }

    const customer = await Customer.findOne({ phone });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.json({
      message: "Login successful!",
      customer
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
});

// =========================
// SAVE CUSTOMER
// =========================

app.post("/api/customers", async (req, res) => {
  try {
    const customer = new Customer(req.body);

    const savedCustomer = await customer.save();

    res.status(201).json({
      message: "Customer saved successfully!",
      customer: savedCustomer
    });

  } catch (error) {
    console.error("Save customer error:", error);

    res.status(400).json({
      message: "Failed to save customer",
      error: error.message
    });
  }
});

// =========================
// UPDATE CUSTOMER PROFILE
// =========================

app.put("/api/customers/:customerId", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required"
      });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.customerId,
      {
        name: name,
        email: email || ""
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.json({
      message: "Profile updated successfully!",
      customer: updatedCustomer
    });

  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      message: "Failed to update profile",
      error: error.message
    });
  }
});

// =========================
// CREATE BOOKING
// =========================

app.post("/api/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);

    const savedBooking = await booking.save();

    res.status(201).json({
      message: "Booking saved successfully!",
      booking: savedBooking
    });

  } catch (error) {
    console.error("Create booking error:", error);

    res.status(400).json({
      message: "Failed to save booking",
      error: error.message
    });
  }
});

// =========================
// GET CUSTOMER BOOKINGS
// =========================

app.get("/api/bookings/:customerId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      customerId: req.params.customerId
    }).sort({ _id: -1 });

    res.json({
      message: "Bookings retrieved successfully!",
      bookings
    });

  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      message: "Failed to retrieve bookings",
      error: error.message
    });
  }
});

// =========================
// UPDATE BOOKING STATUS
// =========================
// This will be used by staff/driver flow later.
// Customer flow itself does NOT change the status.

app.put("/api/bookings/:bookingId/status", async (req, res) => {
  try {
    const { status, currentStage } = req.body;

    if (!status || currentStage === undefined) {
      return res.status(400).json({
        message: "Status and currentStage are required"
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      {
        status: status,
        currentStage: currentStage
      },
      {
        new: true
      }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    res.json({
      message: "Booking status updated successfully!",
      booking: updatedBooking
    });

  } catch (error) {
    console.error("Update booking status error:", error);

    res.status(500).json({
      message: "Failed to update booking status",
      error: error.message
    });
  }
});

// =========================
// CREATE FINANCE / INSURANCE ENQUIRY
// =========================

app.post("/api/finance-enquiries", async (req, res) => {
  try {
    const {
      customerId,
      name,
      phone,
      type,
      vehicleType,
      rcNumber
    } = req.body;

    if (
      !customerId ||
      !name ||
      !phone ||
      !type ||
      !vehicleType
    ) {
      return res.status(400).json({
        message: "Required enquiry details are missing"
      });
    }

    const enquiry = new FinanceEnquiry({
      customerId,
      name,
      phone,
      type,
      vehicleType,
      rcNumber: rcNumber || ""
    });

    const savedEnquiry = await enquiry.save();

    res.status(201).json({
      message: "Enquiry submitted successfully!",
      enquiry: savedEnquiry
    });

  } catch (error) {
    console.error("Finance enquiry error:", error);

    res.status(500).json({
      message: "Failed to submit enquiry",
      error: error.message
    });
  }
});

// =========================
// GET CUSTOMER FINANCE / INSURANCE ENQUIRIES
// =========================

app.get("/api/finance-enquiries/:customerId", async (req, res) => {
  try {
    const enquiries = await FinanceEnquiry.find({
      customerId: req.params.customerId
    }).sort({ _id: -1 });

    res.json({
      message: "Enquiries retrieved successfully!",
      enquiries
    });

  } catch (error) {
    console.error("Get finance enquiries error:", error);

    res.status(500).json({
      message: "Failed to retrieve enquiries",
      error: error.message
    });
  }
});

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(
    `Transmaa Backend running at http://localhost:${PORT}`
  );
});