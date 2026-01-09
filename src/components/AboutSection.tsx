import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './AboutSection.module.css';

const skills = [
    { name: 'Next.js', color: '#fff' },
    { name: 'React', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Docker', color: '#2496ed' },
    { name: 'MongoDB', color: '#47a248' },
    { name: 'Discord.js', color: '#5865f2' },
    { name: 'Figma', color: '#f24e1e' },
];

export default function AboutSection() {
    return (
        <section className={styles.section} id="about">
            <div className={styles.container}>
                <motion.div
                    className={styles.imageColumn}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className={styles.angelWrapper}
                    >
                        <Image
                            src="/angel-white.png"
                            alt="Guardian Angel"
                            width={600}
                            height={800}
                            className={styles.angelImage}
                            priority
                        />
                    </motion.div>
                </motion.div>
                <motion.div
                    className={styles.textColumn}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.title}>About Me</h2>
                    <p className={styles.bio}>
                        I am a passionate Full Stack Developer with a knack for building high-performance,
                        scalable web applications and intelligent bots. My journey began with simple scripts
                        and has evolved into architecting complex systems that serve thousands of users.
                    </p>
                    <p className={styles.bio}>
                        I believe in clean code, modern design, and user-centric experiences. Whether its
                        a SaaS platform or a community Discord bot, I bring the same level of precision and creativity.
                    </p>

                    <div className={styles.grid}>
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                className={styles.skillCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                style={{ borderColor: skill.color }}
                            >
                                <span className={styles.skillName}>{skill.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Image Column Removed for cleaner layout with Angels in Hero */}
                {/* <div className={styles.decorationCircle}></div> */}
            </div>
        </section>
    );
}
