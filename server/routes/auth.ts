import { Router } from "express";
import { login, register, sendToken } from "../controllers/authController";
import { authenticateAndAttach } from "../utils/jwtHelper";

const cookieParser = require("cookie-parser");

const router = Router();

router.post("/login", login, sendToken);
router.post("/register", register, sendToken);

//handle coockie parsing
router.use(cookieParser());

//authenticate & add the userID to the request body
router.use(authenticateAndAttach);
router.get("/regenerate_token", sendToken);

export default router;
