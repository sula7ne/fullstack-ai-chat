"use client"

import AIChat from "@/components/AIChat/AIChat";
import styles from "./page.module.scss";

export default function Home() {
    return (
        <main className={styles.main}>
            <AIChat />
        </main>
    );
}
