import { Router } from "express";
import { chatReply } from "../controllers/chatControllers";

const router = Router();

router.post("/", chatReply);

export default router;
