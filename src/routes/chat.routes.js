import { Router } from "express";
import { creatMessage, getMessages } from "../controller/chat.controller.js";
const chatRoot = Router();
import { authProtected } from "../middleware.js/Authmiddleware.js";

chatRoot.route("/getMessage").get(authProtected, getMessages);
chatRoot.route("/createMessage").post(authProtected, creatMessage);
export { chatRoot };
