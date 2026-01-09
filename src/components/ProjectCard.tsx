import styles from './ProjectCard.module.css';

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    repoUrl: string;
    demoUrl?: string;
    color?: 'blue' | 'purple' | 'green';
}

export default function ProjectCard({
    title,
    description,
    tags,
    repoUrl,
    demoUrl,
    color = 'blue'
}: ProjectCardProps) {
    return (
        <div className={`${styles.card} ${styles[color]}`}>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.tags}>
                    {tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>
                <div className={styles.links}>
                    <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                        GitHub
                    </a>
                    {demoUrl && (
                        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
            <div className={styles.glow} />
        </div>
    );
}
