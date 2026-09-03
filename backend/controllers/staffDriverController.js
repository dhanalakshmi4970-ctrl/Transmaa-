const Driver =
    require("../models/Driver");


// ==========================================
// GET PENDING DRIVERS
// ==========================================

exports.getPendingDrivers =
    async (req, res) => {

        try {

            const drivers =
                await Driver.find({

                    verificationStatus:
                        "pending"

                })

                    .populate(

                        "userId",

                        "name phone"

                    )

                    .sort({

                        createdAt:
                            -1

                    });


            res.status(200).json({

                count:
                    drivers.length,

                drivers:
                    drivers

            });

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };



// ==========================================
// GET ALL DRIVERS
// ==========================================

exports.getAllDrivers =
    async (req, res) => {

        try {

            const drivers =
                await Driver.find()

                    .populate(
                        "userId",
                        "name phone"
                    )

                    .sort({

                        createdAt:
                            -1

                    });


            res.status(200).json({

                count:
                    drivers.length,

                drivers:
                    drivers

            });

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };



// ==========================================
// GET SINGLE DRIVER
// ==========================================

exports.getDriverById =
    async (req, res) => {

        try {

            const driver =
                await Driver.findById(

                    req.params.id

                )

                    .populate(

                        "userId",

                        "name phone"

                    );


            if (!driver) {

                return res.status(404).json({

                    message:
                        "Driver not found"

                });

            }


            res.status(200).json({

                driver:
                    driver

            });

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };



// ==========================================
// APPROVE DRIVER
// ==========================================

exports.approveDriver =
    async (req, res) => {

        try {

            const driver =
                await Driver.findByIdAndUpdate(

                    req.params.id,

                    {

                        verificationStatus:
                            "approved"

                    },

                    {

                        new: true

                    }

                );


            if (!driver) {

                return res.status(404).json({

                    message:
                        "Driver not found"

                });

            }


            res.status(200).json({

                message:
                    "Driver approved successfully",

                driver:
                    driver

            });

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };



// ==========================================
// REJECT DRIVER
// ==========================================

exports.rejectDriver =
    async (req, res) => {

        try {

            const driver =
                await Driver.findByIdAndUpdate(

                    req.params.id,

                    {

                        verificationStatus:
                            "rejected"

                    },

                    {

                        new: true

                    }

                );


            if (!driver) {

                return res.status(404).json({

                    message:
                        "Driver not found"

                });

            }


            res.status(200).json({

                message:
                    "Driver rejected",

                driver:
                    driver

            });

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };