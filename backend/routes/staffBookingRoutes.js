const express =
    require("express");

const router =
    express.Router();


const auth =
    require(
        "../middleware/authMiddleware"
    );


const staff =
    require(
        "../middleware/staffMiddleware"
    );


const controller =
    require(
        "../controllers/staffBookingController"
    );


// ==========================================
// DASHBOARD STATISTICS
// ==========================================

router.get(

    "/dashboard/stats",

    auth,

    staff,

    controller.getDashboardStats

);


// ==========================================
// PENDING BOOKINGS
// ==========================================

router.get(

    "/pending",

    auth,

    staff,

    controller.getPendingBookings

);


// ==========================================
// ALL BOOKINGS
// ==========================================

router.get(

    "/",

    auth,

    staff,

    controller.getAllBookings

);


// ==========================================
// DRIVER ACCEPTED ORDERS
// ==========================================

router.get(

    "/orders/driver-accepted",

    auth,

    staff,

    controller.getDriverAcceptedOrders

);


// ==========================================
// ACTIVE ORDERS
// ==========================================

router.get(

    "/orders/active",

    auth,

    staff,

    controller.getActiveOrders

);


// ==========================================
// COMPLETED ORDERS
// ==========================================

router.get(

    "/orders/completed",

    auth,

    staff,

    controller.getCompletedOrders

);


// ==========================================
// APPROVE BOOKING
// ==========================================

router.put(

    "/:id/approve",

    auth,

    staff,

    controller.approveBooking

);


// ==========================================
// REJECT BOOKING
// ==========================================

router.put(

    "/:id/reject",

    auth,

    staff,

    controller.rejectBooking

);


// ==========================================
// CONFIRM PICKUP
// ==========================================

router.put(

    "/:id/confirm",

    auth,

    staff,

    controller.confirmPickup

);


// ==========================================
// SINGLE BOOKING
// ==========================================

router.get(

    "/:id",

    auth,

    staff,

    controller.getBookingById

);


module.exports =
    router;