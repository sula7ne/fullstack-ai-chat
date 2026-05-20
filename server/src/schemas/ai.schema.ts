import { z } from "zod";

export const chatMessageDto = z.object({
    role: z.enum(["user", "assistant", "system"], {
        message: `Role must be either 'user', 'assistant', or 'system'`
    }),
    content: z.string({
        message: "Content is required"
    }).min(1, "Content cannot be empty")
});

export const chatRequestDto = z.object({
    messages: z
        .array(chatMessageDto, {
            message: "Messages array is required"
        })
        .min(1, "Messages array must contain at least one message"),
    
});

export type chatMessageDtoType = z.infer<typeof chatMessageDto>;
export type chatRequestDtoType = z.infer<typeof chatRequestDto>;