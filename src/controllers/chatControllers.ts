import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import chatWithGPT from "../services/chatWithGPT";

// const TASKS = [
//   {
//     id: 1,
//     title: "Check Emails",
//     isCompleted: false,
//   },
//   {
//     id: 2,
//     title: "Complete Work Task",
//     isCompleted: false,
//   },
//   {
//     id: 3,
//     title: "Exercise",
//     isCompleted: false,
//   },
//   {
//     id: 4,
//     title: "Grocery Shopping",
//     isCompleted: false,
//   },
//   {
//     id: 5,
//     title: "Read for 20 Minutes",
//     isCompleted: false,
//   },
// ];

export const chatReply = async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body;

  const jsonRequestMessage =
    "Convert the above tasks into JSON. Array of objects. Each object with the following fields: id, title, isCompleted. isComplete set to false by default.";

  const updatedPrompt = `${message} ${jsonRequestMessage}`;
  try {
    const response = await chatWithGPT(updatedPrompt);
    res.status(StatusCodes.OK).json({
      message: JSON.parse(response),
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to process request",
    });
  }
};
