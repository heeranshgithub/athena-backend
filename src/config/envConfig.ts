import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is not defined in the environment variables.");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

if (!process.env.JWT_LIFETIME) {
  throw new Error("JWT_LIFETIME is not defined in the environment variables.");
}
if (!process.env.MONGODB_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "OPENAI_API_KEY is not defined in the environment variables.",
  );
}

if (!process.env.REPLICATE_API_KEY) {
  throw new Error(
    "REPLICATE_API_KEY is not defined in the environment variables.",
  );
}

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_LIFETIME = process.env.JWT_LIFETIME;
export const MONGODB_URI = process.env.MONGODB_URI;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;
