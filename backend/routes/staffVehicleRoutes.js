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
        "../controllers/staffVehicleController"
    );


// ==========================================
// BUYER INTERESTS
// ==========================================

router.get(

    "/interests",

    auth,

    staff,

    controller.getVehicleInterests

);


// ==========================================
// PENDING VEHICLES
// ==========================================

router.get(

    "/pending",

    auth,

    staff,

    controller.getPendingVehicles

);


// ==========================================
// ALL VEHICLES
// ==========================================

router.get(

    "/",

    auth,

    staff,

    controller.getAllVehicles

);


// ==========================================
// APPROVE VEHICLE
// ==========================================

router.put(

    "/:id/approve",

    auth,

    staff,

    controller.approveVehicle

);


// ==========================================
// REJECT VEHICLE
// ==========================================

router.put(

    "/:id/reject",

    auth,

    staff,

    controller.rejectVehicle

);


// ==========================================
// SINGLE VEHICLE
// ==========================================

router.get(

    "/:id",

    auth,

    staff,

    controller.getVehicleById

);


module.exports =
    router;