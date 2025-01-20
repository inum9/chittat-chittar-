import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import { root } from "../routes/user.routes.js";
import { authProtected } from "../middleware.js/Authmiddleware.js";

const app= express();
const server = http.createServer(app);

//initialize the connectionn

const  io= new Server(server,()=>{
    cors: {
        origin: '*';
        methods: ['GET', 'POST'];
    }
});




//connection of socket 

io.on("connection",(socket)=>{
        console.log(`user is connected!!`);
        socket.on("disconnect",()=>{
                    console.log(`user is disconnected!!`);
                    
        });
        
});



app.use(express.json());
app.use(cors());


//;routes
app.use("/api/v1/user",root);

//protected


export {app};
