import { Router } from "express";   
import { loginUser, registerUser } from "../controller/user.controller.js";
const root= Router();


root.route("/register").post(registerUser);
root.route("/login").get(loginUser);

export {root};