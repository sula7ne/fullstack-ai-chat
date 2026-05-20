"use client"

import { SubmitEvent, useRef, useState } from 'react';

import AudioBtn from './AudioBtn/AudioBtn';
import { ChatMessage } from '@/types/chat';
import styles from './AIChatForm.module.scss';
import { useSendMessageMutation } from '@/state/api/aiApi';

type SendMessageTrigger = ReturnType<typeof useSendMessageMutation>[0];

interface AIChatFormProps {
    messages: ChatMessage[],
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
    sendMessage: SendMessageTrigger,
    isLoading: boolean
}

const AIChatForm = ({ messages, setMessages, sendMessage, isLoading }: AIChatFormProps) => {
    const [inputValue, setInputValue] = useState('');
    const [isListening, setIsListening] = useState(false);

    const recognitionRef = useRef<any>(null);
    
    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputValue.trim() || isLoading) return;

        if (isListening) recognitionRef.current?.stop();

        const userMessage: ChatMessage = { role: 'user', content: inputValue };
        
        const updatedMessages = [...messages, userMessage];
        
        setMessages(updatedMessages);
        setInputValue('');

        try {
            const aiResponse = await sendMessage({ messages: updatedMessages }).unwrap();

            setMessages((prev) => [...prev, aiResponse]);
        } catch (err: any) {
            console.error("Error:", err);

            const errorMessage: ChatMessage = { 
                role: 'assistant', 
                content: `⚠️ ${err?.data?.message || 'Server Error!'}`
            };

            setMessages((prev) => [...prev, errorMessage]);
        }
    };

    return (
        <form className={styles['ai-form']} onSubmit={handleSubmit}>
            <AudioBtn isListening={isListening} setIsListening={setIsListening} setInputValue={setInputValue} isLoading={isLoading} />
            
            <input 
                type='text' 
                className={styles.text} 
                placeholder='Ask whatever you want' 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
            />
            
            <button className={styles.submit} type="submit" disabled={isLoading || !inputValue.trim()}>
                {/* fa6/FaAngleRight */}
                <svg width={26} height={26} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>
            </button>
        </form>
    );
}

export default AIChatForm;