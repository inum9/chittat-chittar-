import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";
const root = Router();
                        root.route("/register").post(registerUser);
export {root};