const express = require('express');
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();


authRouter.post("/register", async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const user = await userModel.create({
            email,
            name,
            password
        });

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,

        )

        res.cookie("jwt_token", token,)

        res.status(201).json({
            message: "User registered successfully",
            user,
            token
        });

    } catch (err) {

        if (err.code === 11000) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = authRouter;