import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import chatWithGPT from "../services/chatWithGPT";

export const chatReply = async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body;

  const jsonRequestMessage =
    "Convert the above tasks into JSON. Array of objects. Each object with the following fields: id, title, isCompleted. isComplete set to false by default.";

  const updatedPrompt = `${message} ${jsonRequestMessage}`;
  try {
    const response = await chatWithGPT(updatedPrompt);

    res.status(StatusCodes.OK).json({
      message: response,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to process request",
    });
  }
};
