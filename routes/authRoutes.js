import express from "express";

import {
    registerUser,
    loginUser
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User authenticated",
            user
        });

    } catch (error) {
        console.error("Get user error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
});

export default router;