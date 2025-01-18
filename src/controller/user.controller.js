import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.jwtSecret,

    {
      expiresIn: "5h",
    }
  );
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!(email || password)) {
    throw new ApiError(401, "user is not active or loggedIn!!");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(401, "user is already created!!");
    }

    const user = await User.create({ username, password, email });

    if (!user) {
      throw new ApiError(401, "user cannot be register!!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "user is successfully created!!"));
  } catch (error) {
    console.log(`error in registering the user ${error}`);
  }
});

// loginUser
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email || password)) {
    throw new ApiError(401, "user is not active or loggedIn!!");
  }
  try {
    const findingUser = await User.findOne({
            email
    });

    if (!findingUser) {
      throw new ApiError(401, "user is not loggedin");
    }
        const validPass=await findingUser.isCorrect(password);
        if(!validPass){
            throw new ApiError(402,"password is not valid ");
        }

        const token = generateToken(findingUser);
        return res.status(200).json({ user: { id: findingUser._id, username: findingUser.username }, token });
  } catch (error) {
    console.log(`error in logging the user with login fuctionality  ${error}`);
  }
});

export { registerUser,loginUser };
