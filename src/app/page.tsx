"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Terminal from '@/components/Terminal';
import ProjectCard from '@/components/ProjectCard';
import LoadingScreen from '@/components/LoadingScreen';
import AboutSection from '@/components/AboutSection';
import styles from './page.module.css';

export default function Home() {
  const containerRef = useRef(null);

  return (
    <>
      <LoadingScreen />
      <main className={styles.main} ref={containerRef}>
        <div className="container">
          {/* Hero Section */}
          <section className={styles.hero}>

            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }} // Delay for loading screen
            >
              <div className={styles.profileWrapper}>
                <Image
                  src="/profile.png"
                  alt="RevCodes Profile"
                  width={120}
                  height={120}
                  className={styles.profileImage}
                  priority
                />
              </div>
              <span className={styles.label}>Full Stack Developer</span>
              <h1 className={`${styles.title} text-gradient`}>RevCodes</h1>
              <p className={styles.subtitle}>
                Building scalable web applications, advanced Discord bots, and interactive digital experiences.
              </p>
              <div className={styles.status}>
                <span className={styles.statusDot}></span>
                Open to work & collaborations
              </div>
            </motion.div>

            {/* Right Side: Terminal Only */}
            <div className={styles.heroRight}>
              <motion.div
                className={styles.heroTerminal}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.8 }}
              >
                <Terminal />
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <AboutSection />

          {/* Projects Grid */}
          <section className={styles.projects} id="projects">
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Featured Projects
            </motion.h2>
            <div className={styles.grid}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ProjectCard
                  title="Lumina SaaS"
                  description="A modern SaaS landing page featuring glassmorphism design, responsive layouts, and a high-conversion hero section."
                  tags={['React', 'Glassmorphism', 'Responsive']}
                  repoUrl="https://github.com/revcodeshq/lumina-saas"
                  color="blue"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ProjectCard
                  title="Nexus Bot"
                  description="Advanced Discord moderation bot with ticket systems, auto-mod, and a web dashboard integration."
                  tags={['Discord.js', 'Node.js', 'MongoDB']}
                  repoUrl="https://github.com/revcodeshq"
                  color="purple"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ProjectCard
                  title="Novus Website"
                  description="Mobile-first business website built with Vanilla JS for maximum performance and clean architecture."
                  tags={['Vanilla JS', 'Mobile-First', 'Performance']}
                  repoUrl="https://github.com/revcodeshq/novus-website"
                  color="green"
                />
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className={styles.footer}>
            <div className={styles.footerContent}>
              <p>© {new Date().getFullYear()} RevCodes. All rights reserved.</p>
              <div className={styles.socials}>
                <a href="https://github.com/revcodeshq" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
