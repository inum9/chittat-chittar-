import { Router } from "express";
import { registerUser, userLogin } from "../controller/user.controller.js";
import { authProtected } from "../middleware.js/Authmiddleware.js";
const root = Router();
                        root.route("/register").post(registerUser);
                        root.route("/login").post(userLogin);

                        //protected routes
                        root.route("/protected").get(authProtected);


                        
export {root};