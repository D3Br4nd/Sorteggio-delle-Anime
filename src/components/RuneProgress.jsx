import { motion } from 'framer-motion';

const RUNE_SYMBOLS = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ'];

export default function RuneProgress({ currentQuestion, totalQuestions = 7 }) {
    return (
        <div className="flex justify-center items-center gap-3 py-4">
            {RUNE_SYMBOLS.map((rune, index) => {
                const isActive = index < currentQuestion;
                const isCurrent = index === currentQuestion;

                return (
                    <motion.div
                        key={index}
                        className={`relative flex items-center justify-center w-10 h-10 rounded-lg ${isActive
                                ? 'bg-gold/20 border border-gold/50'
                                : isCurrent
                                    ? 'bg-gold/10 border border-gold/30'
                                    : 'bg-shadow-dark/50 border border-parchment/10'
                            }`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: isCurrent ? [1, 1.05, 1] : 1,
                            opacity: 1
                        }}
                        transition={{
                            delay: index * 0.1,
                            scale: isCurrent ? { duration: 1.5, repeat: Infinity } : { duration: 0.3 }
                        }}
                    >
                        <span
                            className={`text-xl font-bold transition-all duration-500 ${isActive
                                    ? 'text-gold text-shadow-gold'
                                    : isCurrent
                                        ? 'text-gold/70 animate-pulse'
                                        : 'text-parchment/30'
                                }`}
                        >
                            {rune}
                        </span>

                        {/* Glow effect for active runes */}
                        {isActive && (
                            <motion.div
                                className="absolute inset-0 rounded-lg bg-gold/20 blur-md"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}

                        {/* Pulse ring for current rune */}
                        {isCurrent && (
                            <motion.div
                                className="absolute inset-0 rounded-lg border-2 border-gold/50"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
