import { Response, Request, Router } from "express";
import { login, register } from "../controllers/authController";
import { authenticateAndAttach } from "../utils/jwtHelper";
import {
  getTasks,
  createTask,
  markTask,
  deleteTask,
} from "../controllers/taskController";
import { request } from "http";
const cookieParser = require("cookie-parser");
const router = Router();

//handle coockie parsing
router.use(cookieParser());

//authenticate & add the userID to the request body
router.use(authenticateAndAttach);
router.get("/get", (req: Request, res: Response) => {
  getTasks(req, res);
});

router.post("/delete", (req: Request, res: Response) => {
  deleteTask(req, res);
});

router.post("/mark", (req: Request, res: Response) => {
  markTask(req, res);
});

router.post("/add-task", (req: Request, res: Response) => {
  createTask(req, res);
});

export default router;
