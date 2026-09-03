const mongoose = require("mongoose");


const vehicleSchema = new mongoose.Schema(

    {

        // ==================================
        // OWNER DETAILS
        // ==================================

        ownerId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        ownerName: {

            type: String

        },


        ownerPhone: {

            type: String

        },


        // ==================================
        // VEHICLE DETAILS
        // ==================================

        vehicleType: {

            type: String,

            required: true

        },


        vehicleBrand: {

            type: String

        },


        vehicleModel: {

            type: String

        },


        vehicleNumber: {

            type: String

        },


        manufacturingYear: {

            type: Number

        },


        price: {

            type: Number

        },


        description: {

            type: String

        },


        image: {

            type: String

        },


        // ==================================
        // VEHICLE STATUS
        // ==================================

        status: {

            type: String,

            enum: [

                "pending",

                "approved",

                "rejected",

                "sold"

            ],

            default: "pending"

        },


        // ==================================
        // BUYER INTEREST
        // ==================================

        interestedBuyers: [

            {

                buyerName: String,

                buyerPhone: String,

                message: String,

                createdAt: {

                    type: Date,

                    default: Date.now

                }

            }

        ]

    },

    {

        timestamps: true

    }

);


module.exports =
    mongoose.model(
        "Vehicle",
        vehicleSchema
    );