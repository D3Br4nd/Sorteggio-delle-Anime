import { motion } from 'framer-motion';
import GlowButton from '../components/GlowButton';

export default function LandingScreen({ onStart }) {
    return (
        <div className="h-dvh flex flex-col items-center justify-center px-6 py-12 safe-area-top safe-area-bottom overflow-y-auto">
            {/* Mystical Seal */}
            <motion.div
                className="relative mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                {/* Outer glow rings */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        width: 200,
                        height: 200,
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Seal container */}
                <motion.div
                    className="relative w-48 h-48 rounded-full flex items-center justify-center"
                    style={{
                        background: 'radial-gradient(circle, rgba(26, 15, 15, 0.9) 0%, rgba(5, 5, 5, 0.95) 100%)',
                        border: '2px solid rgba(212, 175, 55, 0.4)',
                        boxShadow: '0 0 40px rgba(212, 175, 55, 0.2), inset 0 0 40px rgba(0, 0, 0, 0.5)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                >
                    {/* Inner rotating ring */}
                    <motion.div
                        className="absolute inset-4 rounded-full border border-gold/30"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Runic circle */}
                    <div className="absolute inset-8 rounded-full border border-gold/20 flex items-center justify-center">
                        <span className="text-4xl text-gold text-shadow-ember">☉</span>
                    </div>

                    {/* Corner runes */}
                    {['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ'].map((rune, i) => (
                        <motion.span
                            key={i}
                            className="absolute text-gold/60 text-lg"
                            style={{
                                top: i < 2 ? '15%' : '75%',
                                left: i % 2 === 0 ? '15%' : '75%',
                            }}
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                        >
                            {rune}
                        </motion.span>
                    ))}
                </motion.div>
            </motion.div>

            {/* Title */}
            <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <motion.h1
                    className="font-cinzel font-bold text-3xl sm:text-4xl text-gold mb-4 text-shadow-ember leading-tight"
                    animate={{
                        textShadow: [
                            '0 0 20px rgba(212, 175, 55, 0.5)',
                            '0 0 40px rgba(212, 175, 55, 0.8)',
                            '0 0 20px rgba(212, 175, 55, 0.5)',
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    Il Sorteggio<br />delle Anime
                </motion.h1>

                <motion.div
                    className="w-32 h-0.5 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-6"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                />

                <motion.p
                    className="font-spectral text-lg text-parchment/80 max-w-xs mx-auto leading-relaxed italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    La Loggia Lumen Mentis ti sta osservando.<br />
                    Svela la tua vera natura.
                </motion.p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
            >
                <GlowButton onClick={onStart}>
                    INIZIA IL RITUALE
                </GlowButton>
            </motion.div>


        </div>
    );
}
