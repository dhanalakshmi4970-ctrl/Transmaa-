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
        "../controllers/staffDriverController"
    );


// ==========================================
// PENDING DRIVERS
// ==========================================

router.get(

    "/pending",

    auth,

    staff,

    controller.getPendingDrivers

);


// ==========================================
// ALL DRIVERS
// ==========================================

router.get(

    "/",

    auth,

    staff,

    controller.getAllDrivers

);


// ==========================================
// APPROVE DRIVER
// ==========================================

router.put(

    "/:id/approve",

    auth,

    staff,

    controller.approveDriver

);


// ==========================================
// REJECT DRIVER
// ==========================================

router.put(

    "/:id/reject",

    auth,

    staff,

    controller.rejectDriver

);


// ==========================================
// SINGLE DRIVER
// ==========================================

router.get(

    "/:id",

    auth,

    staff,

    controller.getDriverById

);


module.exports =
    router;