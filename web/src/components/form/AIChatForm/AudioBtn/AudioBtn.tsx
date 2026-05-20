"use client"

import { Dispatch, MouseEvent, SetStateAction, useEffect, useRef } from 'react';

import clsx from 'clsx';
import styles from './AudioBtn.module.scss';

interface AudioBtnProps {
    isListening: boolean,
    setIsListening: Dispatch<SetStateAction<boolean>>,
    setInputValue: Dispatch<SetStateAction<string>>,
    isLoading: boolean
}

const AudioBtn = ({ isListening, setIsListening, setInputValue, isLoading }: AudioBtnProps) => {
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'ru-RU';

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInputValue((prev) => prev + (prev ? ' ' : '') + transcript);
            };

            recognition.onend = () => setIsListening(false);
            recognition.onerror = () => setIsListening(false);

            recognitionRef.current = recognition;
        } else {
            console.warn("Web Speech API doesn't support!");
        }
    }, [setInputValue, setIsListening]);

    const toggleListening = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setIsListening(true);
            recognitionRef.current.start();
        }
    };

    return (
        <button 
            className={clsx(styles.audio, isListening && styles.listening)}
            type='button'
            onClick={toggleListening}
            disabled={isLoading}
            title={isListening ? "Stop record" : "Start record"}
        >
            {/* fa6/FaMicrophone */}
            {isListening ?
                <svg width={26} height={26} fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"/></svg>
                :
                <svg width={26} height={26} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M192 0C139 0 96 43 96 96l0 160c0 53 43 96 96 96s96-43 96-96l0-160c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6c85.8-11.7 152-85.3 152-174.4l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-40z"></path></svg>
            }
        </button>
    );
}

export default AudioBtn;