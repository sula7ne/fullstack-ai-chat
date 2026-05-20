import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

import { ApiError } from "@/exceptions/apiError";
import { cookiesDtoType } from "@/schemas/cookies.schema";

interface ISchema {
    body?: ZodType<any>;
    params?: ZodType<any>;
    query?: ZodType<any>;
    cookies?: ZodType<cookiesDtoType>;
}

export const validateMiddleware = (schema: ISchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if(schema.body) req.body = schema.body.parse(req.body);
            if(schema.params) req.params = schema.params.parse(req.params);
            if(schema.query) req.query = schema.query.parse(req.query);
            if(schema.cookies) req.cookies = schema.cookies.parse(req.cookies);

            next();
        } catch(err: any) {
            if(err instanceof ZodError) {
                const errors = err.issues.map(e => ({ field: e.path.join('.'), message: e.message }));
                
                return next(ApiError.BadRequest("Validation failed", errors));
            }

            next(err);
        }
    }
}