import { Router } from "express";
import { registerUser, userLogin } from "../controller/user.controller.js";
const root = Router();
                        root.route("/register").post(registerUser);
                        root.route("/login").post(userLogin);
export {root};