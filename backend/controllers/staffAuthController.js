const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// ==========================================
// CREATE INITIAL STAFF ACCOUNT
// ==========================================

exports.setupStaff = async (req, res) => {

    try {

        const setupKey =
            req.headers["x-setup-key"];


        if (
            setupKey !==
            process.env.STAFF_SETUP_KEY
        ) {

            return res.status(403).json({

                message:
                    "Invalid setup key"

            });

        }


        const {

            name,

            phone,

            password

        } = req.body;


        if (
            !name ||
            !phone ||
            !password
        ) {

            return res.status(400).json({

                message:
                    "Name, phone and password are required"

            });

        }


        const existingStaff =
            await User.findOne({

                phone: phone

            });


        if (existingStaff) {

            return res.status(400).json({

                message:
                    "User already exists with this phone number"

            });

        }


        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        const staff =
            await User.create({

                name: name,

                phone: phone,

                password: hashedPassword,

                role: "staff",

                status: "active"

            });


        res.status(201).json({

            message:
                "Staff account created successfully",

            staff: {

                id: staff._id,

                name: staff.name,

                phone: staff.phone,

                role: staff.role

            }

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
// STAFF LOGIN
// ==========================================

exports.login = async (req, res) => {

    try {

        const {

            phone,

            password

        } = req.body;


        if (
            !phone ||
            !password
        ) {

            return res.status(400).json({

                message:
                    "Phone and password are required"

            });

        }


        const staff =
            await User.findOne({

                phone: phone,

                role: "staff"

            });


        if (!staff) {

            return res.status(404).json({

                message:
                    "Staff account not found"

            });

        }


        if (
            staff.status !== "active"
        ) {

            return res.status(403).json({

                message:
                    "Staff account is not active"

            });

        }


        const passwordMatch =
            await bcrypt.compare(

                password,

                staff.password

            );


        if (!passwordMatch) {

            return res.status(401).json({

                message:
                    "Incorrect password"

            });

        }


        const token =
            jwt.sign(

                {

                    id: staff._id,

                    role: staff.role

                },

                process.env.JWT_SECRET,

                {

                    expiresIn: "1d"

                }

            );


        res.status(200).json({

            message:
                "Staff login successful",

            token: token,

            staff: {

                id: staff._id,

                name: staff.name,

                phone: staff.phone,

                role: staff.role

            }

        });

    }

    catch (error) {

        res.status(500).json({

            message:
                error.message

        });

    }

};