const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.json({
        message: "Transmaa Staff Backend is Running Successfully!"
    });

});


// ==========================================
// STAFF ROUTES
// ==========================================

app.use(
    "/api/staff/auth",
    require("./routes/staffAuthRoutes")
);

app.use(
    "/api/staff/bookings",
    require("./routes/staffBookingRoutes")
);

app.use(
    "/api/staff/drivers",
    require("./routes/staffDriverRoutes")
);

app.use(
    "/api/staff/enquiries",
    require("./routes/staffEnquiryRoutes")
);

app.use(
    "/api/staff/vehicles",
    require("./routes/staffVehicleRoutes")
);


// ==========================================
// ERROR HANDLING
// ==========================================

app.use((req, res) => {

    res.status(404).json({
        message: "Route not found"
    });

});


// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose.connect(process.env.MONGODB_URI)

    .then(() => {

        console.log("=================================");
        console.log("MongoDB Connected Successfully!");
        console.log("=================================");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {

            console.log(
                `Transmaa Backend running on http://localhost:${PORT}`
            );

        });

    })

    .catch((error) => {

        console.log("MongoDB Connection Failed!");

        console.log(error.message);

    });