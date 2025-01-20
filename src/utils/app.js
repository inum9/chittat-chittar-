import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { Message } from "../model/message.js";
import { root } from "../routes/user.routes.js";
import { authProtected } from "../middleware.js/Authmiddleware.js";
import { chatRoot } from "../routes/chat.routes.js";

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
        // join a room for private chat 

        socket.on("joinRoom",({userId,recipentId})=>{
                const room= {userId,recipentId}.sort().join("_");
                socket.join(room);
        });

        //handle sending a message
        socket.on("sendMessage",async({senderId,recipentId,content})=>{
            const room = [senderId, recipentId].sort().join('_');
                        // emit message to the room 
                        io.to(room).emit("newMessage",{ senderId, recipentId, content });

                        //save messaage to database
                await Message.create({sender:senderId,recipient:recipentId,content});
        });
        socket.on("disconnect",()=>{
                    console.log(`user is disconnected!!`);
                    
        });
        
});



app.use(express.json());
app.use(cors());


//;routes
app.use("/api/v1/user",root);
app.use("/api/v2/chat",chatRoot);

//protected


export {server};
