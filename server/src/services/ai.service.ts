import { chatMessageDtoType } from "@/schemas/ai.schema";
import { openai } from "@/config/openai";

class AIService {
    async generateResponse(messages: chatMessageDtoType[]) {
        const hasSystemPrompt = messages.some(m => m.role === 'system');
        
        const finalMessages = hasSystemPrompt ? messages : [{ role: 'system' as const, content: 'You are a helpful AI assistant.' }, ...messages];

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: finalMessages,
            max_tokens: 1500
        });

        const { role, content } = completion.choices[0].message;

        return { role, content };
    }
}

export default new AIService();