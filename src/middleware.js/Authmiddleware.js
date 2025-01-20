import jwt, { decode } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiErroe.js ";
        const authProtected= (req,res,next)=>{
            const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
            if(!token){
                throw new ApiError(400,"unAuthorized Request for the user!!");

            }
            try {
                        const decodedToken=  jwt.verify(token,process.env.jwtSecret);
                        if(!decodedToken){
                            throw new ApiError(401,"token cannot be decoded!!");

                        }

                        req.user=decodedToken;
                        next();
            } catch (error) {
                console.log(`erorr in the protexted middlewarea ${error}`);
                
            }
        };


        export {authProtected}