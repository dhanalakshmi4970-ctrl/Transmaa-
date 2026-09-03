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
        "../controllers/staffEnquiryController"
    );


// ==========================================
// ALL ENQUIRIES
// ==========================================

router.get(

    "/",

    auth,

    staff,

    controller.getAllEnquiries

);


// ==========================================
// UPDATE ENQUIRY STATUS
// ==========================================

router.put(

    "/:id/status",

    auth,

    staff,

    controller.updateEnquiryStatus

);


// ==========================================
// SINGLE ENQUIRY
// ==========================================

router.get(

    "/:id",

    auth,

    staff,

    controller.getEnquiryById

);


module.exports =
    router;