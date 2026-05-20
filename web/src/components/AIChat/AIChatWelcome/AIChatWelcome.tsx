"use client"

import styles from './AIChatWelcome.module.scss';

const AIChatWelcome = () => {
    return (
        <div className={styles.welcome}>
            <div className={styles.icon}>
                {/* fa6/FaMessage */}
                <svg width={20} height={20} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"></path></svg>
            </div>

            <h3>Hi there!</h3>
            <h2>What would you like to know?</h2>
            <p>Use one of the most common prompts below or ask your own question</p>
        </div>
    );
}

export default AIChatWelcome;