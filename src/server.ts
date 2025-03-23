import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectToDB from "./config/connectToDB";
import { MONGODB_URI } from "./config/envConfig";
import authRouter from "./routes/authRoutes";
import authenticateUser from "./middlewares/auth";
import errorHandlerMiddleware from "./middlewares/error-handler";
import chatRouter from "./routes/chatRoutes";
const app = express();
dotenv.config();

app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat", authenticateUser, chatRouter);

app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectToDB(MONGODB_URI);
    app.listen(8080, "0.0.0.0", () => {
      console.log(`Server is listening on port 8080`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
