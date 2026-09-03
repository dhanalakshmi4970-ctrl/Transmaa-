const Booking =
    require("../models/Booking");


// ==========================================
// GET ALL PENDING BOOKINGS
// ==========================================

exports.getPendingBookings =
    async (req, res) => {

        try {

            const bookings =
                await Booking.find({

                    status: "pending"

                })

                    .populate(

                        "customerId",

                        "name phone"

                    )

                    .sort({

                        createdAt: -1

                    });


            res.status(200).json({

                count:
                    bookings.length,

                bookings:
                    bookings

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
// GET ALL BOOKINGS
// ==========================================

exports.getAllBookings =
    async (req, res) => {

        try {

            const bookings =
                await Booking.find()

                    .populate(
                        "customerId",
                        "name phone"
                    )

                    .populate(
                        "driverId",
                        "name phone"
                    )

                    .sort({
                        createdAt: -1
                    });


            res.status(200).json({

                count:
                    bookings.length,

                bookings:
                    bookings

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
// GET SINGLE BOOKING
// ==========================================

exports.getBookingById =
    async (req, res) => {

        try {

            const booking =
                await Booking.findById(

                    req.params.id

                )

                    .populate(
                        "customerId",
                        "name phone"
                    )

                    .populate(
                        "driverId",
                        "name phone"
                    );


            if (!booking) {

                return res.status(404).json({

                    message:
                        "Booking not found"

                });

            }


            res.status(200).json({

                booking:
                    booking

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
// APPROVE BOOKING
// ==========================================

exports.approveBooking =
    async (req, res) => {

        try {

            const booking =
                await Booking.findByIdAndUpdate(

                    req.params.id,

                    {

                        status:
                            "approved"

                    },

                    {

                        new: true

                    }

                );


            if (!booking) {

                return res.status(404).json({

                    message:
                        "Booking not found"

                });

            }


            res.status(200).json({

                message:
                    "Booking approved successfully",

                booking:
                    booking

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
// REJECT BOOKING
// ==========================================

exports.rejectBooking =
    async (req, res) => {

        try {

            const booking =
                await Booking.findByIdAndUpdate(

                    req.params.id,

                    {

                        status:
                            "rejected"

                    },

                    {

                        new: true

                    }

                );


            if (!booking) {

                return res.status(404).json({

                    message:
                        "Booking not found"

                });

            }


            res.status(200).json({

                message:
                    "Booking rejected",

                booking:
                    booking

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
// DRIVER ACCEPTED ORDERS
// ==========================================

exports.getDriverAcceptedOrders =
    async (req, res) => {

        try {

            const orders =
                await Booking.find({

                    status:
                        "driver_accepted"

                })

                    .populate(

                        "customerId",

                        "name phone"

                    )

                    .populate(

                        "driverId",

                        "name phone"

                    )

                    .sort({

                        updatedAt:
                            -1

                    });


            res.status(200).json({

                count:
                    orders.length,

                orders:
                    orders

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
// CONFIRM PICKUP
// ==========================================

exports.confirmPickup =
    async (req, res) => {

        try {

            const booking =
                await Booking.findByIdAndUpdate(

                    req.params.id,

                    {

                        status:
                            "confirmed"

                    },

                    {

                        new: true

                    }

                );


            if (!booking) {

                return res.status(404).json({

                    message:
                        "Booking not found"

                });

            }


            res.status(200).json({

                message:
                    "Pickup confirmed successfully",

                booking:
                    booking

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
// GET ACTIVE ORDERS
// ==========================================

exports.getActiveOrders =
    async (req, res) => {

        try {

            const orders =
                await Booking.find({

                    status: {

                        $in: [

                            "confirmed",

                            "on_the_way"

                        ]

                    }

                })

                    .populate(
                        "customerId",
                        "name phone"
                    )

                    .populate(
                        "driverId",
                        "name phone"
                    );


            res.status(200).json({

                count:
                    orders.length,

                orders:
                    orders

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
// GET COMPLETED ORDERS
// ==========================================

exports.getCompletedOrders =
    async (req, res) => {

        try {

            const orders =
                await Booking.find({

                    status:
                        "delivered"

                })

                    .populate(
                        "customerId",
                        "name phone"
                    )

                    .populate(
                        "driverId",
                        "name phone"
                    );


            res.status(200).json({

                count:
                    orders.length,

                orders:
                    orders

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
// STAFF DASHBOARD STATISTICS
// ==========================================

exports.getDashboardStats =
    async (req, res) => {

        try {

            const totalBookings =
                await Booking.countDocuments();


            const pendingBookings =
                await Booking.countDocuments({

                    status:
                        "pending"

                });


            const approvedBookings =
                await Booking.countDocuments({

                    status:
                        "approved"

                });


            const rejectedBookings =
                await Booking.countDocuments({

                    status:
                        "rejected"

                });


            const activeOrders =
                await Booking.countDocuments({

                    status: {

                        $in: [

                            "confirmed",

                            "on_the_way"

                        ]

                    }

                });


            const deliveredOrders =
                await Booking.countDocuments({

                    status:
                        "delivered"

                });


            res.status(200).json({

                totalBookings,

                pendingBookings,

                approvedBookings,

                rejectedBookings,

                activeOrders,

                deliveredOrders

            });

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };