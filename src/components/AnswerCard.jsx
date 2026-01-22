import { motion } from 'framer-motion';

export default function AnswerCard({ answer, isSelected, onSelect, index }) {
    return (
        <motion.button
            onClick={() => onSelect(answer)}
            className={`relative w-full p-5 rounded-xl text-left transition-all duration-300 
        ${isSelected
                    ? 'glass-dark box-shadow-gold-intense border-gold/60'
                    : 'glass-dark border-glow hover:border-gold/40'
                }
        btn-press no-select
      `}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Background glow when selected */}
            {isSelected && (
                <motion.div
                    className="absolute inset-0 rounded-xl bg-gold/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}

            {/* Shine effect border */}
            {isSelected && (
                <motion.div
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                </motion.div>
            )}

            <div className="relative z-10 flex items-start gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl
          ${isSelected
                        ? 'bg-gold/30 shadow-lg shadow-gold/20'
                        : 'bg-shadow-medium/50'
                    }
        `}>
                    <motion.span
                        animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        {answer.icon}
                    </motion.span>
                </div>

                {/* Text */}
                <p className={`flex-1 font-spectral text-base leading-relaxed pt-1
          ${isSelected ? 'text-parchment-light' : 'text-parchment/90'}
        `}>
                    {answer.text}
                </p>

                {/* Selection indicator */}
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1
          ${isSelected
                        ? 'border-gold bg-gold/20'
                        : 'border-parchment/30'
                    }
        `}>
                    {isSelected && (
                        <motion.div
                            className="w-3 h-3 rounded-full bg-gold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                        />
                    )}
                </div>
            </div>
        </motion.button>
    );
}
