import { useMemo } from 'react';
import { motion } from 'framer-motion';

// Generate random particles
function generateParticles(count, type) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: type === 'ember' ? 2 + Math.random() * 4 : 1 + Math.random() * 3,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 10,
        opacity: 0.2 + Math.random() * 0.4,
    }));
}

export default function ParticleBackground({ type = 'dust', intensity = 'medium' }) {
    const count = intensity === 'high' ? 40 : intensity === 'medium' ? 25 : 15;

    const particles = useMemo(() => generateParticles(count, type), [count, type]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className={`absolute rounded-full ${type === 'ember' ? 'particle-ember' : 'particle-dust'
                        }`}
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                        opacity: [0, particle.opacity, particle.opacity, 0],
                        y: [0, -100, -200, -300],
                        x: [0, Math.sin(particle.id) * 30, Math.cos(particle.id) * 20, Math.sin(particle.id) * 40],
                        rotate: [0, 180, 360, 540],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}

            {/* Ambient glow spots */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-gold/3 blur-3xl" />
        </div>
    );
}
