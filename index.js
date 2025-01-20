
import  dotenv from "dotenv";
import { server } from "./src/utils/app.js";
import { connectDb } from "./config/db.js";
const port= process.env.PORT||8000



dotenv.config("./.env");

connectDb().then(
    ()=>{
                server.listen(port,()=>{
                        console.log(`server is running  on port : ${port}`);
                });
    }
)



