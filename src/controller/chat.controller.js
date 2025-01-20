import { Message } from "../model/message.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiErroe.js ";


const getMessages = asyncHandler(async (req, res) => {
  try {
    const { recipentId } = req.params;
    const message = await Message.find({
      $or: [
        { sender: req.user.id, recipient: recipentId },
        { sender: recipentId, recipient: req.user.id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "username")
      .populate("recipient", "username");

    if (!message) {
      throw new ApiError(401, "message cannot be fetched !!");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, message, "all messages are fetch successfully!")
      );
  } catch (error) {
    console.log(`errorr in fetching the messages between two user!! ${error}`);
  }
});

const creatMessage= asyncHandler(async (req,res)=>{
    const { recipientId, content } = req.body;
    if (!content) {
        return res.status(400).json({ message: 'Message content is required' });
    }

    const message = await Message.create({
        sender: req.user.id,
        recipient: recipientId,
        content,
    });
    if(!message){
        return res.status(402).json(new ApiResponse(401,"message cannot be created!!"));
    };
    return res.status(200).json(200,message,"messages created successfully!!");
});

export { getMessages,creatMessage };
