const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(

    {

        name: {
            type: String,
            required: true,
            trim: true
        },


        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },


        password: {
            type: String,
            required: true
        },


        role: {

            type: String,

            enum: [
                "customer",
                "driver",
                "staff"
            ],

            default: "customer"

        },


        status: {

            type: String,

            enum: [
                "active",
                "pending",
                "rejected"
            ],

            default: "active"

        }

    },

    {

        timestamps: true

    }

);


module.exports =
    mongoose.model("User", userSchema);