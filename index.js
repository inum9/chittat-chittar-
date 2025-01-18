
import  dotenv from "dotenv";
import { app } from "./src/utils/app.js";
import { connectDb } from "./config/db.js";
const port= process.env.PORT||8000



dotenv.config("./.env");

connectDb().then(
    ()=>{
                app.listen(port,()=>{
                        console.log(`server is running  on port : ${port}`);
                });
    }
)



