import dotenv from 'dotenv';
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['DEV', 'PRODUCTION']),
    PORT: z.coerce.number(),
    API_URL: z.url(),
    CLIENT_URL: z.url(),
    OPENAI_API_KEY: z.string()
});

export const env = envSchema.parse(process.env);