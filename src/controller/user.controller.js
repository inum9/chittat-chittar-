import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiErroe.js ";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";


const generateToken = () => {
  return jwt.sign({ id: User._id }, process.env.jwtSecret, { expiresIn: "1h" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!(email || password)) {
    throw new ApiError(401, "user details not entered!");
  }
  try {
    const existingUser = await User.find({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      throw new ApiError(401, "user is already registerd!");
    }
    const user = await User.create({ username, email, password });
    if (!user) {
      throw new ApiError(401, "user cannot be created!!");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, user, "user is created successfully!"));
  } catch (error) {
    console.log(`error in creating the User ${error}`);
  }
});

export { registerUser };
