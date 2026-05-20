import { AIController } from "@/controllers/ai.controller";
import { chatRequestDto } from "@/schemas/ai.schema";
import express from "express"
import { validateMiddleware } from "@/middlewares/validateMiddleware";

const router = express.Router();
const aiController = new AIController();

router.post('/message', validateMiddleware({ body: chatRequestDto }), aiController.sendMessage);


export default router;