import express,{ Router, Request, Response } from "express";
import { logout, register, signin } from "../controllers/user.controllers";
import User from "../models/User";

const router:Router =express.Router();

export function authRoutes():Router{

    console.log("auth")
router.post('/signup',register);
router.post('/signin',signin);
router.post('/logout',logout);

// Fetch warehouse managers directly in authRoutes
router.get('/managers', async (req: Request, res: Response) => {
    try {
        const managers = await User.find({ role: "manager" }).select("_id name email");
        
        res.status(200).json({ success: true, users: managers });
    } catch (error) {
        console.error("Error fetching managers:", error);
        res.status(500).json({ success: false, message: "Error fetching managers" });
    }
});

return router;
}

