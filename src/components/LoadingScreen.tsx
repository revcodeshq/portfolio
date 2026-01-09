"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [text, setText] = useState('');
    const fullText = "INITIALIZING SYSTEM... ACCESS GRANTED.";

    useEffect(() => {
        // Typing effect
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => setIsLoading(false), 800);
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className={styles.container}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className={styles.terminal}>
                        <span className={styles.prefix}>{">"}</span>
                        <span className={styles.text}>{text}</span>
                        <span className={styles.cursor}>_</span>
                    </div>
                    <motion.div
                        className={styles.loader}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "linear" }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
