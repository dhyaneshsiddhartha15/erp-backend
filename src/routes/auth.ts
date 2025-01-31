

import express,{ Router } from "express";
import { logout, register, signin } from "../controllers/user.controllers";

const router:Router =express.Router();

export function authRoutes():Router{

    console.log("auth")
router.post('/signup',register);
router.post('/signin',signin);
router.post('/logout',logout);

return router;
}