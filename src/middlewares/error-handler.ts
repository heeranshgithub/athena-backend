import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

interface CustomError extends Error {
  statusCode?: number
}

const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, try again later.',
  }

  res.status(defaultError.statusCode).json({ message: defaultError.message })
}

export default errorHandlerMiddleware
