"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './Terminal.module.css';

interface CommandOutput {
    command: string;
    response: React.ReactNode;
}

export default function Terminal() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<CommandOutput[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history]);

    // Initial welcome message
    useEffect(() => {
        setHistory([
            {
                command: 'welcome',
                response: (
                    <span>
                        Welcome to the interactive portfolio v2.0.<br />
                        Type <span className={styles.highlight}>help</span> to see available commands.
                    </span>
                ),
            },
        ]);
    }, []);

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();
        let response: React.ReactNode = '';

        switch (cleanCmd) {
            case 'help':
                response = (
                    <div className={styles.gridResponse}>
                        <span>Available commands:</span>
                        <span><span className={styles.highlight}>about</span>    - Who am I?</span>
                        <span><span className={styles.highlight}>projects</span> - View my work</span>
                        <span><span className={styles.highlight}>skills</span>   - Tech stack info</span>
                        <span><span className={styles.highlight}>contact</span>  - Get in touch</span>
                        <span><span className={styles.highlight}>clear</span>    - Clear terminal</span>
                    </div>
                );
                break;
            case 'about':
                response = "I'm a Full Stack Developer specializing in modern web apps and advanced Discord bots. I build scalable, high-performance solutions.";
                break;
            case 'skills':
                response = (
                    <div className={styles.gridResponse}>
                        <span>Frontend: Next.js, React, CSS3</span>
                        <span>Backend: Node.js, Express, Discord.js</span>
                        <span>DevOps: Docker, Nginx, Linux</span>
                    </div>
                );
                break;
            case 'projects':
                response = "Check out the cards below for a visual showcase of my best work (Lumina, Novus, Nexus).";
                break;
            case 'contact':
                response = "GitHub: @revcodeshq";
                break;
            case 'clear':
                setHistory([]);
                return;
            case '':
                response = '';
                break;
            default:
                response = `Command not found: ${cleanCmd}. Type 'help' for a list of commands.`;
        }

        setHistory([...history, { command: cmd, response }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div className={styles.terminal} onClick={focusInput}>
            <div className={styles.header}>
                <div className={styles.buttons}>
                    <div className={`${styles.dot} ${styles.red}`}></div>
                    <div className={`${styles.dot} ${styles.yellow}`}></div>
                    <div className={`${styles.dot} ${styles.green}`}></div>
                </div>
                <div className={styles.title}>guest@revcodes:~/portfolio</div>
            </div>
            <div className={styles.body} ref={bodyRef}>
                {history.map((item, index) => (
                    <div key={index} className={styles.entry}>
                        <div className={styles.commandLine}>
                            <span className={styles.prompt}>➜</span>
                            <span className={styles.path}>~</span>
                            <span className={styles.command}>{item.command}</span>
                        </div>
                        <div className={styles.response}>{item.response}</div>
                    </div>
                ))}
                <div className={styles.currentLine}>
                    <span className={styles.prompt}>➜</span>
                    <span className={styles.path}>~</span>
                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.input}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        spellCheck={false}
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    );
}
