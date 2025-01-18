import mongoose from "mongoose";
import { dbName } from "../dbName.js";


const connectDb= async()=>{
        try {
                const connectionInstance= await mongoose.connect(`${process.env.MongoDbUri}/${dbName}`);
                console.log(`data base is connected successfully!! ,at ${connectionInstance.connection.host}`);
                
        } catch (error) {
            console.log(`error in database connection ${error}`);
            
        }
};


export{ connectDb};