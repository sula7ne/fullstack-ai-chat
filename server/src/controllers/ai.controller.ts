import { NextFunction, Request, Response } from "express";

import aiService from "@/services/ai.service";
import { chatRequestDtoType } from "@/schemas/ai.schema";

export class AIController {
    async sendMessage(req: Request<{}, {}, chatRequestDtoType>, res: Response, next: NextFunction) {
        try {
            const { messages } = req.body;

            const result = await aiService.generateResponse(messages);

            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}