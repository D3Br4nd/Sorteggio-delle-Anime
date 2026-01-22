import { motion } from 'framer-motion';

export default function GlowButton({ children, onClick, variant = 'primary', className = '', disabled = false }) {
    const variants = {
        primary: {
            bg: 'bg-gradient-to-r from-gold-dark via-gold to-gold-dark',
            text: 'text-shadow-deep',
            glow: 'shadow-gold/50',
            hover: 'hover:from-gold hover:via-gold-light hover:to-gold',
        },
        secondary: {
            bg: 'bg-transparent border-2 border-gold/50',
            text: 'text-gold',
            glow: 'shadow-gold/30',
            hover: 'hover:border-gold hover:bg-gold/10',
        },
    };

    const style = variants[variant];

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={`
        relative px-8 py-4 rounded-xl font-cinzel font-bold text-lg tracking-wider
        ${style.bg} ${style.text} ${style.hover}
        shadow-lg shadow-${style.glow}
        btn-press no-select
        disabled:opacity-50 disabled:cursor-not-allowed
        overflow-hidden
        ${className}
      `}
            whileHover={{ scale: disabled ? 1 : 1.03 }}
            whileTap={{ scale: disabled ? 1 : 0.97 }}
        >
            {/* Animated glow background */}
            <motion.div
                className="absolute inset-0 bg-gold/20 rounded-xl"
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'linear',
                }}
            />

            {/* Button text */}
            <span className="relative z-10">{children}</span>

            {/* Outer glow ring */}
            <motion.div
                className="absolute -inset-1 rounded-xl border border-gold/30 -z-10"
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </motion.button>
    );
}
