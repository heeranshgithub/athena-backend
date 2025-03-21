import mongoose, { Document, Schema, Model } from "mongoose";
import jwt, { SignOptions } from "jsonwebtoken";
import argon2 from "argon2";
import { JWT_LIFETIME, JWT_SECRET } from "../config/envConfig";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  createJWT: () => string;
  comparePassword: (passwordAttempt: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      maxlength: 60,
      select: false,
      trim: true,
    },
  },
  { timestamps: true },
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await argon2.hash(this.password);
  next();
});

UserSchema.methods.createJWT = function (): string {
  if (typeof JWT_SECRET !== "string") {
    throw new Error("JWT_SECRET must be defined");
  }

  return jwt.sign({ userId: this._id.toString() }, JWT_SECRET, {
    expiresIn: JWT_LIFETIME,
  } as SignOptions);
};

UserSchema.methods.comparePassword = async function (
  passwordAttempt: string,
): Promise<boolean> {
  return await argon2.verify(this.password as string, passwordAttempt);
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
