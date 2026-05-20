"use client"

import { useEffect, useState } from "react";

import AIChatForm from "@/components/form/AIChatForm/AIChatForm";
import AIChatMessages from "@/components/AIChat/AIChatMessages/AIChatMessages";
import AIChatWelcome from "@/components/AIChat/AIChatWelcome/AIChatWelcome";
import { ChatMessage } from "@/types/chat";
import styles from "./AIChat.module.scss";
import { useSendMessageMutation } from "@/state/api/aiApi";

export const AIChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);
    const [sendMessage, { isLoading }] = useSendMessageMutation();

    useEffect(() => {
        const saved = localStorage.getItem('chat_history');
        if (saved) {
            setMessages(JSON.parse(saved));
        }
        
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('chat_history', JSON.stringify(messages));
        }
    }, [messages, isHydrated]);

    if (!isHydrated) return <div className={styles['ai-chat']} />;

    return (
        <div className={styles['ai-chat']}>
            <div className={styles.content}>
                {messages.length ?
                    <AIChatMessages messages={messages} isLoading={isLoading} />
                    :
                    <AIChatWelcome />
                }
            </div>

            <AIChatForm messages={messages} setMessages={setMessages} sendMessage={sendMessage} isLoading={isLoading} />
        </div>
    );
}

export default AIChat;