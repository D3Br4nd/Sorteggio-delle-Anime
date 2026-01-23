import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toBlob, toPng } from 'html-to-image';
import GlowButton from '../components/GlowButton';

export default function ResultScreen({ result, onRestart }) {
    const [showFlash, setShowFlash] = useState(true);
    const [revealed, setRevealed] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        // Flash effect
        const flashTimer = setTimeout(() => {
            setShowFlash(false);
        }, 500);

        // Reveal animation
        const revealTimer = setTimeout(() => {
            setRevealed(true);
        }, 800);

        return () => {
            clearTimeout(flashTimer);
            clearTimeout(revealTimer);
        };
    }, []);

    const handleShare = async () => {
        if (!cardRef.current || isSharing) return;

        setIsSharing(true);
        const shareText = `Ho appena scoperto il mio destino al Sorteggio delle Anime! Sono ${result.title}. ⚔️🏛️📜\n\n#CaTE26 #PAAA #ProLocoVenticanese #CacciaAlTesoro`;
        const shareTitle = 'Il Sorteggio delle Anime - CaTE 2026';

        try {
            // Check if Web Share API is available and supports sharing files
            if (navigator.share && navigator.canShare) {
                // Take a screenshot of the card
                const blob = await toBlob(cardRef.current, {
                    cacheBust: true,
                    includeQueryParams: true,
                    backgroundColor: '#050505', // Ensure dark background in share
                });

                if (!blob) throw new Error('Failed to capture screenshot');

                const imageFile = new File([blob], 'my-destiny.png', { type: 'image/png' });

                if (navigator.canShare({ files: [imageFile] })) {
                    await navigator.share({
                        title: shareTitle,
                        text: shareText,
                        files: [imageFile],
                    });
                } else {
                    // Fallback to sharing only text/url if file share is not supported
                    await navigator.share({
                        title: shareTitle,
                        text: shareText,
                        url: window.location.origin,
                    });
                }
            } else {
                // Fallback for desktop or non-sharing browsers: just download and show instructions
                const dataUrl = await toPng(cardRef.current, {
                    cacheBust: true,
                    backgroundColor: '#050505',
                });
                const link = document.createElement('a');
                link.download = 'il-mio-destino-cate.png';
                link.href = dataUrl;
                link.click();
                alert('Immagine salvata! Ora caricala sui social con gli hashtag: #CaTE26 #PAAA #ProLocoVenticanese #CacciaAlTesoro');
            }
        } catch (error) {
            console.error('Error sharing:', error);
            // Even if everything fails, at least provide a fallback text share
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: shareTitle,
                        text: shareText,
                    });
                } catch (e) {
                    console.error('Final share fallback failed');
                }
            }
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col px-5 py-8 safe-area-top safe-area-bottom overflow-y-auto">
            {/* Flash overlay */}
            <AnimatePresence>
                {showFlash && (
                    <motion.div
                        className="flash-overlay"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                )}
            </AnimatePresence>

            {/* Result Content */}
            <motion.div
                className="flex-1 flex flex-col items-center justify-center pt-8"
                initial={{ scale: 2.5, opacity: 0, y: -100 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    delay: 0.3,
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                }}
            >
                {/* Result Type Badge */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <span className="font-cinzel text-sm tracking-[0.3em] text-gold/70">
                        IL TUO DESTINO È SEGNATO
                    </span>
                </motion.div>

                {/* Hero Portrait Card (Captured for screenshot) */}
                <div ref={cardRef} className="w-full max-w-sm">
                    <motion.div
                        className="relative w-full rounded-2xl overflow-hidden mb-8"
                        style={{
                            background: result.accentGradient,
                            boxShadow: `0 0 60px ${result.color}40, 0 0 100px ${result.color}20`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        {/* Inner content */}
                        <div className="relative p-1">
                            <div className="bg-shadow-deep/90 rounded-xl p-6">
                                {/* Symbol */}
                                <motion.div
                                    className="text-center mb-4"
                                    animate={{
                                        textShadow: [
                                            `0 0 20px ${result.color}80`,
                                            `0 0 40px ${result.color}`,
                                            `0 0 20px ${result.color}80`,
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="text-6xl">{result.icon}</span>
                                </motion.div>

                                {/* Title */}
                                <motion.h1
                                    className="font-cinzel font-bold text-3xl text-center mb-2"
                                    style={{ color: result.color }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    {result.title}
                                </motion.h1>

                                {/* Subtitle */}
                                <motion.p
                                    className="font-spectral text-lg text-parchment/70 text-center mb-4 italic"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                >
                                    {result.subtitle}
                                </motion.p>

                                {/* Divider */}
                                <motion.div
                                    className="w-24 h-0.5 mx-auto mb-4"
                                    style={{ background: `linear-gradient(90deg, transparent, ${result.color}, transparent)` }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                />

                                {/* Tagline */}
                                <motion.h2
                                    className="font-cinzel text-xl text-gold text-center mb-4 text-shadow-gold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                >
                                    {result.tagline}
                                </motion.h2>

                                {/* Traits */}
                                <motion.div
                                    className="flex justify-center gap-3 mb-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                >
                                    {result.traits.map((trait, index) => (
                                        <span
                                            key={trait}
                                            className="px-3 py-1 rounded-full text-xs font-spectral tracking-wider"
                                            style={{
                                                backgroundColor: `${result.color}20`,
                                                color: result.color,
                                                border: `1px solid ${result.color}40`,
                                            }}
                                        >
                                            {trait}
                                        </span>
                                    ))}
                                </motion.div>

                                {/* Description */}
                                <motion.p
                                    className="font-spectral text-base text-parchment/90 text-center leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.3 }}
                                >
                                    {result.description}
                                </motion.p>
                            </div>
                        </div>

                        {/* Animated border glow */}
                        {!isSharing && (
                            <motion.div
                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                style={{
                                    border: `2px solid ${result.color}60`,
                                    boxShadow: `inset 0 0 30px ${result.color}20`,
                                }}
                                animate={{
                                    boxShadow: [
                                        `inset 0 0 30px ${result.color}20, 0 0 20px ${result.color}30`,
                                        `inset 0 0 50px ${result.color}30, 0 0 40px ${result.color}50`,
                                        `inset 0 0 30px ${result.color}20, 0 0 20px ${result.color}30`,
                                    ],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        )}
                    </motion.div>
                </div>

                {/* CaTE 2026 Badge */}
                <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <p className="font-cinzel text-xs tracking-[0.2em] text-parchment/50">
                        CACCIA AL TESORO EVOLUTION 2026
                    </p>
                </motion.div>
            </motion.div>

            {/* Action Buttons - More central and padded to avoid footer overlap */}
            <motion.div
                className="pt-8 pb-32 space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
            >
                {/* Primary CTA - Screenshot and Share */}
                <motion.div
                    className="w-full p-1 rounded-2xl text-center relative overflow-hidden group max-w-sm mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                >
                    <div
                        className="absolute inset-0 opacity-40 blur-xl group-hover:opacity-60 transition-opacity duration-500"
                        style={{ background: result.accentGradient }}
                    />

                    <div className="relative glass-dark p-3 rounded-2xl border border-white/10">
                        <GlowButton
                            className="w-full"
                            onClick={handleShare}
                            disabled={isSharing}
                        >
                            {isSharing ? 'PREPARAZIONE...' : 'RECLAMA IL TUO DESTINO'}
                        </GlowButton>
                    </div>
                </motion.div>

                {/* Restart */}
                <button
                    onClick={onRestart}
                    className="w-full py-3 font-spectral text-parchment/60 hover:text-parchment transition-colors"
                >
                    Ripeti il Rituale
                </button>
            </motion.div>
        </div>
    );
}
