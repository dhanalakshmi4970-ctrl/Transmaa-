const express =
    require("express");

const router =
    express.Router();


const controller =
    require(
        "../controllers/staffAuthController"
    );


// ==========================================
// CREATE STAFF ACCOUNT
// ==========================================

router.post(

    "/setup",

    controller.setupStaff

);


// ==========================================
// STAFF LOGIN
// ==========================================

router.post(

    "/login",

    controller.login

);


module.exports =
    router;