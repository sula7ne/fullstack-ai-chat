import { NextFunction, Request, Response } from "express";

import { ApiError } from "@/exceptions/apiError";
import { OpenAIError } from "openai";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors.length ? err.errors : undefined,
        });
    }

    if(err instanceof OpenAIError) {
        return res.status(err?.code).json({
            message: err.message || "OpenAI Error"
        });
    }

    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
}