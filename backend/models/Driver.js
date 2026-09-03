const mongoose = require("mongoose");


const driverSchema = new mongoose.Schema(

    {

        // ==================================
        // USER CONNECTION
        // ==================================

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // ==================================
        // PERSONAL DETAILS
        // ==================================

        name: {

            type: String,

            required: true

        },


        dob: {

            type: Date

        },


        gender: {

            type: String

        },


        bio: {

            type: String

        },


        photo: {

            type: String

        },


        experience: {

            type: Number

        },


        // ==================================
        // VEHICLE DETAILS
        // ==================================

        vehicleType: {

            type: String

        },


        vehicleModel: {

            type: String

        },


        vehicleNumber: {

            type: String

        },


        // ==================================
        // DOCUMENT DETAILS
        // ==================================

        dlNumber: {

            type: String

        },


        panNumber: {

            type: String

        },


        // ==================================
        // VERIFICATION
        // ==================================

        verificationStatus: {

            type: String,

            enum: [

                "pending",

                "approved",

                "rejected"

            ],

            default: "pending"

        }

    },

    {

        timestamps: true

    }

);


module.exports =
    mongoose.model(
        "Driver",
        driverSchema
    );