import mongoose, { Schema }  from "mongoose";   
import bcrypt from "bcrypt";

const userSchema= new Schema({

    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }


},{timestamps:true});

const User= mongoose.model("user",userSchema);
export {User};

//hashing the paassword before saving 

userSchema.pre("save",async(next)=>{
            if(!this.isModified("password")) return next();
           this.password= await bcrypt.hash(this.password,10);
           next();
});

//checking for correct password
 userSchema.methods.isCorrect=async function(enteredPassword) {
           const isMatch=  await bcrypt.compare(enteredPassword,this.password);
           return isMatch;
 }
