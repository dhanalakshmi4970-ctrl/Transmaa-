const Enquiry =
    require("../models/Enquiry");


// ==========================================
// GET ALL ENQUIRIES
// ==========================================

exports.getAllEnquiries =
    async (req, res) => {

        try {

            const enquiries =
                await Enquiry.find()

                    .sort({

                        createdAt:
                            -1

                    });


            res.status(200).json({

                count:
                    enquiries.length,

                enquiries:
                    enquiries

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
// GET SINGLE ENQUIRY
// ==========================================

exports.getEnquiryById =
    async (req, res) => {

        try {

            const enquiry =
                await Enquiry.findById(

                    req.params.id

                );


            if (!enquiry) {

                return res.status(404).json({

                    message:
                        "Enquiry not found"

                });

            }


            res.status(200).json({

                enquiry:
                    enquiry

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
// UPDATE ENQUIRY STATUS
// ==========================================

exports.updateEnquiryStatus =
    async (req, res) => {

        try {

            const {

                status

            } = req.body;


            const allowedStatus = [

                "new",

                "contacted",

                "closed"

            ];


            if (

                !allowedStatus.includes(
                    status
                )

            ) {

                return res.status(400).json({

                    message:
                        "Invalid status"

                });

            }


            const enquiry =
                await Enquiry.findByIdAndUpdate(

                    req.params.id,

                    {

                        status:
                            status

                    },

                    {

                        new: true

                    }

                );


            if (!enquiry) {

                return res.status(404).json({

                    message:
                        "Enquiry not found"

                });

            }


            res.status(200).json({

                message:
                    "Enquiry status updated",

                enquiry:
                    enquiry

            });

        }

        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };