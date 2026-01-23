import { motion, AnimatePresence } from 'framer-motion';
import { backgroundThemes } from '../data/questions';

const ShapeRenderer = ({ type, color }) => {
    const shapes = {
        'triangle': <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke={color} strokeWidth="1" />,
        'circle-cross': (
            <g fill="none" stroke={color} strokeWidth="1">
                <circle cx="50" cy="50" r="40" />
                <path d="M50 10 L50 90 M10 50 L90 50" />
            </g>
        ),
        'zig-zag': <path d="M10 50 L30 20 L50 80 L70 20 L90 50" fill="none" stroke={color} strokeWidth="1" />,
        'lightning': <path d="M60 10 L30 50 L70 50 L40 90" fill="none" stroke={color} strokeWidth="1" />,
        'diamond': <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke={color} strokeWidth="1" />,
        'pentagon-star': <path d="M50 10 L61 38 L90 38 L67 56 L76 84 L50 67 L24 84 L33 56 L10 38 L39 38 Z" fill="none" stroke={color} strokeWidth="1" />,
        'spiral': <path d="M50 50 C50 30 70 30 70 50 C70 70 30 70 30 50 C30 30 80 30 80 50 C80 80 20 80 20 50" fill="none" stroke={color} strokeWidth="1" />,
        'concentric-circles': (
            <g fill="none" stroke={color} strokeWidth="1">
                <circle cx="50" cy="50" r="10" />
                <circle cx="50" cy="50" r="25" />
                <circle cx="50" cy="50" r="40" />
            </g>
        ),
        'path-split': <path d="M50 90 L50 50 L10 20 M50 50 L90 20" fill="none" stroke={color} strokeWidth="1" />,
        'intersection': <path d="M10 10 L90 90 M90 10 L10 90" fill="none" stroke={color} strokeWidth="1" />,
        'crown-crest': <path d="M10 80 L10 40 L30 60 L50 20 L70 60 L90 40 L90 80 Z" fill="none" stroke={color} strokeWidth="1" />,
        'sword-vertical': <path d="M50 10 L50 80 M30 30 L70 30 M45 80 L55 80 L55 90 L45 90 Z" fill="none" stroke={color} strokeWidth="1" />,
        'eye-wisdom': (
            <g fill="none" stroke={color} strokeWidth="1">
                <path d="M10 50 Q50 10 90 50 Q50 90 10 50" />
                <circle cx="50" cy="50" r="15" />
            </g>
        ),
        'scroll-seal': (
            <g fill="none" stroke={color} strokeWidth="1">
                <rect x="20" y="20" width="60" height="60" rx="2" />
                <path d="M40 40 L60 60 M60 40 L40 60" />
            </g>
        )
    };

    return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
            {shapes[type] || shapes['triangle']}
        </svg>
    );
};

export default function DynamicBackground({ theme = 'dungeon', children }) {
    const config = backgroundThemes[theme] || backgroundThemes.dungeon;

    return (
        <div className="fixed inset-0 overflow-hidden bg-shadow-deep">
            <AnimatePresence mode="wait">
                <motion.div
                    key={theme}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Base gradient background */}
                    <div
                        className="absolute inset-0 transition-opacity duration-1000"
                        style={{
                            background: config.gradient,
                        }}
                    />

                    {/* Ancient Floating Shapes */}
                    <AnimatePresence>
                        {config.shapes && config.shapes.map((shape, index) => (
                            <motion.div
                                key={`${theme}-${shape}-${index}`}
                                className="absolute w-64 h-64 pointer-events-none"
                                style={{
                                    top: `${20 + index * 40}%`,
                                    left: `${10 + (index % 2) * 50}%`,
                                }}
                                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                                animate={{
                                    opacity: [0, 0.15, 0],
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 90, 180, 270, 360],
                                    x: [0, 30, -30, 0],
                                    y: [0, -20, 20, 0],
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 20 + index * 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <ShapeRenderer type={shape} color="#D4AF37" />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Accent color overlay */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ backgroundColor: config.accent }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />

                    {/* Radial light from top */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
                        }}
                    />

                    {/* Vignette effect */}
                    <div className="absolute inset-0 vignette pointer-events-none" />

                    {/* Noise texture overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.02] pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Chiaroscuro lighting */}
                    <div className="absolute inset-0 chiaroscuro pointer-events-none" />
                </motion.div>
            </AnimatePresence>

            {/* Content layer - No overflow hidden here to allow screens to scroll themselves */}
            <div className="relative z-20 h-full">
                {children}
            </div>
        </div>
    );
}
