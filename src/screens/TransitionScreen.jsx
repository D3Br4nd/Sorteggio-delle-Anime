import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RUNE_SYMBOLS = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ'];

export default function TransitionScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [activeRunes, setActiveRunes] = useState([]);

    useEffect(() => {
        // Progress animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        // Rune lighting animation
        const runeInterval = setInterval(() => {
            setActiveRunes((prev) => {
                if (prev.length >= 12) return prev;
                return [...prev, prev.length];
            });
        }, 200);

        // Complete after 3 seconds
        const timer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
            clearInterval(runeInterval);
        };
    }, [onComplete]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
            {/* Rotating Rune Circle */}
            <motion.div
                className="relative w-64 h-64 mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Outer spinning ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-gold/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />

                {/* Inner spinning ring (opposite direction) */}
                <motion.div
                    className="absolute inset-8 rounded-full border border-gold/20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />

                {/* Rune circle */}
                <div className="absolute inset-0">
                    {RUNE_SYMBOLS.map((rune, index) => {
                        const angle = (index / 12) * 360;
                        const isActive = activeRunes.includes(index);

                        return (
                            <motion.div
                                key={index}
                                className="absolute"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: `rotate(${angle}deg) translateY(-120px) rotate(-${angle}deg)`,
                                }}
                            >
                                <motion.span
                                    className={`text-2xl font-cinzel transition-all duration-300 ${isActive ? 'text-gold text-shadow-ember' : 'text-parchment/20'
                                        }`}
                                    initial={{ scale: 1 }}
                                    animate={isActive ? {
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 1, 0.8],
                                    } : {}}
                                    transition={{ duration: 0.5 }}
                                >
                                    {rune}
                                </motion.span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Center eye */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-shadow-blood to-shadow-deep border border-gold/40 flex items-center justify-center">
                        <motion.span
                            className="text-4xl text-gold"
                            animate={{
                                opacity: [0.7, 1, 0.7],
                                textShadow: [
                                    '0 0 10px rgba(212, 175, 55, 0.5)',
                                    '0 0 30px rgba(212, 175, 55, 0.8)',
                                    '0 0 10px rgba(212, 175, 55, 0.5)',
                                ],
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            ⊛
                        </motion.span>
                    </div>
                </motion.div>

                {/* Glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                    }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>

            {/* Text */}
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <h2 className="font-cinzel text-xl text-gold mb-3 text-shadow-gold">
                    La Loggia sta giudicando
                </h2>
                <p className="font-spectral text-lg text-parchment/70 italic">
                    il tuo spirito...
                </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
                className="w-48 h-1 bg-shadow-dark rounded-full mt-8 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <motion.div
                    className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </motion.div>
        </div>
    );
}
