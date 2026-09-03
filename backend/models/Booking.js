const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema(

    {

        // ==================================
        // CUSTOMER
        // ==================================

        customerId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // ==================================
        // DRIVER
        // ==================================

        driverId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            default: null

        },


        // ==================================
        // LOCATION DETAILS
        // ==================================

        fromLocation: {

            type: String,

            required: true

        },


        toLocation: {

            type: String,

            required: true

        },


        // ==================================
        // SHIFTING DETAILS
        // ==================================

        shiftingDate: {

            type: Date

        },


        shiftingTime: {

            type: String

        },


        goodsType: {

            type: String

        },


        truckType: {

            type: String

        },


        tonnage: {

            type: Number

        },


        budget: {

            type: Number

        },


        // ==================================
        // DELIVERY DETAILS
        // ==================================

        deliveryName: {

            type: String

        },


        deliveryPhone: {

            type: String

        },


        deliveryAddress: {

            type: String

        },


        // ==================================
        // ORDER STATUS
        // ==================================

        status: {

            type: String,

            enum: [

                "pending",

                "approved",

                "rejected",

                "driver_accepted",

                "confirmed",

                "on_the_way",

                "delivered"

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
        "Booking",
        bookingSchema
    );