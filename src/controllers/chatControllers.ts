import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import chatWithGPT from '../services/chatWithGPT'

export const chatReply = async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body

  try {
    const response = await chatWithGPT(message)

    res.status(StatusCodes.OK).json({
      message: response,
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to process request',
    })
  }
}
