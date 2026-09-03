const Vehicle =
    require("../models/Vehicle");


// ==========================================
// GET PENDING VEHICLES
// ==========================================

exports.getPendingVehicles =
    async (req, res) => {

        try {

            const vehicles =
                await Vehicle.find({

                    status:
                        "pending"

                })

                    .populate(

                        "ownerId",

                        "name phone"

                    )

                    .sort({

                        createdAt:
                            -1

                    });


            res.status(200).json({

                count:
                    vehicles.length,

                vehicles:
                    vehicles

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
// GET ALL VEHICLES
// ==========================================

exports.getAllVehicles =
    async (req, res) => {

        try {

            const vehicles =
                await Vehicle.find()

                    .populate(

                        "ownerId",

                        "name phone"

                    )

                    .sort({

                        createdAt:
                            -1

                    });


            res.status(200).json({

                count:
                    vehicles.length,

                vehicles:
                    vehicles

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
// GET SINGLE VEHICLE
// ==========================================

exports.getVehicleById =
    async (req, res) => {

        try {

            const vehicle =
                await Vehicle.findById(

                    req.params.id

                )

                    .populate(

                        "ownerId",

                        "name phone"

                    );


            if (!vehicle) {

                return res.status(404).json({

                    message:
                        "Vehicle not found"

                });

            }


            res.status(200).json({

                vehicle:
                    vehicle

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
// APPROVE VEHICLE
// ==========================================

exports.approveVehicle =
    async (req, res) => {

        try {

            const vehicle =
                await Vehicle.findByIdAndUpdate(

                    req.params.id,

                    {

                        status:
                            "approved"

                    },

                    {

                        new: true

                    }

                );


            if (!vehicle) {

                return res.status(404).json({

                    message:
                        "Vehicle not found"

                });

            }


            res.status(200).json({

                message:
                    "Vehicle approved successfully",

                vehicle:
                    vehicle

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
// REJECT VEHICLE
// ==========================================

exports.rejectVehicle =
    async (req, res) => {

        try {

            const vehicle =
                await Vehicle.findByIdAndUpdate(

                    req.params.id,

                    {

                        status:
                            "rejected"

                    },

                    {

                        new: true

                    }

                );


            if (!vehicle) {

                return res.status(404).json({

                    message:
                        "Vehicle not found"

                });

            }


            res.status(200).json({

                message:
                    "Vehicle rejected",

                vehicle:
                    vehicle

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
// GET BUYER INTERESTS
// ==========================================

exports.getVehicleInterests =
    async (req, res) => {

        try {

            const vehicles =
                await Vehicle.find({

                    "interestedBuyers.0": {

                        $exists:
                            true

                    }

                })

                    .populate(

                        "ownerId",

                        "name phone"

                    );


            res.status(200).json({

                count:
                    vehicles.length,

                vehicles:
                    vehicles

            });

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };