import { ChatMessage, ChatRequest } from '@/types/chat';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const aiApi = createApi({
    reducerPath: 'aiApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3001/api',
    }),
    endpoints: (builder) => ({
        sendMessage: builder.mutation<ChatMessage, ChatRequest>({
            query: (chatBody) => ({
                url: '/ai/message',
                method: 'POST',
                body: chatBody,
            }),
        }),
    }),
});

export const { useSendMessageMutation } = aiApi;