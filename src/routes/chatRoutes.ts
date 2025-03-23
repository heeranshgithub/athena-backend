import { Router } from "express";
import { chatReply } from "../controllers/chatController";

const router = Router();

router.post("/", chatReply);

export default router;
