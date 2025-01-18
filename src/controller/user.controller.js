import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js"
import jwt from "jsonwebtoken";
import { User  } from "../model/user.model.js";

const generateToken= (user)=>{
        return jwt.sign({
            id:user.id
        },
    process.env.jwtSecret,

{
        expiresIn:"5h"
}
)
}


const registerUser= asyncHandler(async(req,res)=>{
                const {username,email ,password}= req.body;
                if(!(email||password)){
                    throw new apiError(401,"user is not active or loggedIn!!");
                }

                try {
                    const existingUser= await User.find();
                    if(existingUser){
                        throw new apiError(401,"user is already created!!");

                    }

                  const user=   await User.create({username,password,email});

                  if(!user){
                    throw new apiError(401,"user cannot be register!!");
                  }

                  return res.status(200).json(new apiResponse(200,user,"user is successfully created!!"));
                } catch (error) {
                    console.log(`error in registering the user ${error}`);
                    
                }
});