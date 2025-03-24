import { Request, Response } from "express";
import { BadRequestError } from "../errors/index.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values!");
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) throw new BadRequestError("Email already in use!");

  if (password.length < 6) {
    throw new BadRequestError("Password must be at least 6 characters long!");
  }

  const user = new User({ name, email, password });
  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    name: user.name,
    email: user.email,
    token,
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values!");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new BadRequestError("Invalid Credentials!");
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new BadRequestError("Invalid Credentials!");
  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    name: user.name,
    email: user.email,
    token,
  });
};
