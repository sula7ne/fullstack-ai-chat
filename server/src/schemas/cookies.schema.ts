import z from "zod";

export const cookiesDto = z.object({
    refreshToken: z.jwt(),
}).strict();
export type cookiesDtoType = z.infer<typeof cookiesDto>;