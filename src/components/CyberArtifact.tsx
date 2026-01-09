"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CyberArtifact() {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                }}
            >
                <Image
                    src="/cyber-artifact-fallback.png"
                    alt="Cyber Artifact"
                    fill
                    style={{ objectFit: 'contain', mixBlendMode: 'screen', filter: 'contrast(1.2) brightness(1.1)' }}
                    priority
                />
            </motion.div>
        </div>
    );
}
