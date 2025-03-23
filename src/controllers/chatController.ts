import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import chatWithGPT from "../services/chatWithGPT";
import chatWithReplicate from "../services/chatWithReplicate";

export const chatReply = async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body;
  // if (!message) {
  //   res.status(StatusCodes.BAD_REQUEST).json({
  //     message: "Message is required",
  //   });
  //   return;
  // }

  try {
    const response = await chatWithGPT(message);
    // const response = await chatWithReplicate(req.body);
    res.status(StatusCodes.OK).json({
      message: response,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to process request",
    });
  }
};
