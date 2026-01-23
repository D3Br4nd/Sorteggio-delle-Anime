import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toBlob, toPng } from 'html-to-image';
import GlowButton from '../components/GlowButton';

export default function ResultScreen({ result, onRestart }) {
    const [showFlash, setShowFlash] = useState(true);
    const [revealed, setRevealed] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [stats, setStats] = useState(null);
    const cardRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL || '/sda/api';

    useEffect(() => {
        // Flash effect
        const flashTimer = setTimeout(() => {
            setShowFlash(false);
        }, 500);

        // Reveal animation
        const revealTimer = setTimeout(() => {
            setRevealed(true);
        }, 800);

        // Track result and fetch stats
        const trackAndFetch = async () => {
            try {
                // 1. Send result to backend
                await fetch(`${API_URL}/results`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ resultId: result.id })
                });

                // 2. Fetch global stats
                const response = await fetch(`${API_URL}/stats`);
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error with tracking/stats:', error);
            }
        };

        trackAndFetch();

        return () => {
            clearTimeout(flashTimer);
            clearTimeout(revealTimer);
        };
    }, [result.id, API_URL]);

    const handleShare = async () => {
        if (!cardRef.current || isSharing) return;

        setIsSharing(true);
        const shareText = `Ho appena scoperto il mio destino al Sorteggio delle Anime! Sono ${result.title}. ⚔️🏛️📜\n\n#CaTE26 #PAAA #ProLocoVenticanese #CacciaAlTesoro`;
        const shareTitle = 'Il Sorteggio delle Anime - CaTE 2026';

        try {
            // Small delay to ensure the UI is ready and the animated glow is hidden
            await new Promise(resolve => setTimeout(resolve, 200));

            const options = {
                cacheBust: true,
                backgroundColor: '#050505',
                pixelRatio: 2,
                style: {
                    borderRadius: '16px',
                }
            };

            // Double render strategy for reliability with fonts and external resources
            // Sometimes html-to-image needs a "warm-up" to capture everything correctly
            await toBlob(cardRef.current, options);
            const blob = await toBlob(cardRef.current, options);

            if (!blob) throw new Error('Failed to capture screenshot');

            // Web Share API support check
            if (navigator.share && navigator.canShare) {
                const imageFile = new File([blob], 'il-mio-destino.png', { type: 'image/png' });

                if (navigator.canShare({ files: [imageFile] })) {
                    await navigator.share({
                        title: shareTitle,
                        text: shareText,
                        files: [imageFile],
                    });
                } else {
                    // Fallback to sharing only text/url if file share is not supported by the browser
                    await navigator.share({
                        title: shareTitle,
                        text: shareText,
                        url: window.location.origin,
                    });
                }
            } else {
                // Desktop / Non-supporting browser fallback - Download image
                const dataUrl = await toPng(cardRef.current, options);
                const link = document.createElement('a');
                link.download = 'il-mio-destino-cate.png';
                link.href = dataUrl;
                link.click();
                alert('Immagine salvata! Ora caricala sui social con gli hashtag: #CaTE26 #PAAA #ProLocoVenticanese #CacciaAlTesoro');
            }
        } catch (error) {
            console.error('Error sharing:', error);

            // Handle specific error cases (except user cancellation)
            if (error.name !== 'AbortError') {
                alert('La condivisione diretta non è stata possibile su questo browser. Scarico l\'immagine per te.');
                try {
                    const dataUrl = await toPng(cardRef.current, { backgroundColor: '#050505', pixelRatio: 2 });
                    const link = document.createElement('a');
                    link.download = 'il-mio-destino-cate.png';
                    link.href = dataUrl;
                    link.click();
                } catch (e) {
                    console.error('Final fallback download failed');
                }
            }
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <div className="h-dvh flex flex-col px-5 py-8 safe-area-top safe-area-bottom overflow-y-auto">
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
                                <motion.div
                                    className="mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                >
                                    <h2 className="font-cinzel text-xl text-gold text-center text-shadow-gold">
                                        {result.tagline}
                                    </h2>
                                </motion.div>

                                {/* Traits */}
                                <motion.div
                                    className="flex justify-center gap-2 mb-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                >
                                    {result.traits.map((trait, index) => (
                                        <span
                                            key={trait}
                                            className="px-2 py-1 rounded-full text-xs font-spectral tracking-wider"
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

                        {/* Animated border glow (Hidden during sharing to avoid glitches) */}
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

                {/* Footer Badge */}
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

            {/* Buttons Section */}
            <motion.div
                className="pt-8 pb-32 space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
            >
                <div className="w-full p-1 rounded-2xl text-center relative overflow-hidden group max-w-sm mx-auto">
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
                </div>

                <button
                    onClick={onRestart}
                    className="w-full py-3 font-spectral text-parchment/60 hover:text-parchment transition-colors"
                >
                    Ripeti il Rituale
                </button>

                {/* Global Ranking Section */}
                {stats && stats.total > 0 && (
                    <motion.div
                        className="mt-12 pt-12 border-t border-white/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                    >
                        <h3 className="font-cinzel text-center text-gold/40 text-xs tracking-[0.3em] mb-8">
                            COSA SONO DIVENTATI GLI ALTRI
                        </h3>

                        <div className="space-y-6 max-w-sm mx-auto">
                            {['cavaliere', 'architetto', 'scriba'].map((id) => {
                                const count = stats.stats[id] || 0;
                                const percentage = Math.round((count / stats.total) * 100);
                                const isCurrent = id === result.id;

                                const label = id === 'cavaliere' ? 'CAVALIERE' :
                                    id === 'architetto' ? 'ARCHITETTO' : 'SCRIBA';

                                const color = id === 'cavaliere' ? '#C41E3A' :
                                    id === 'architetto' ? '#4A7C59' : '#4169E1';

                                return (
                                    <div key={id} className={`space-y-2 ${isCurrent ? 'opacity-100' : 'opacity-50'}`}>
                                        <div className="flex justify-between items-end">
                                            <span className="font-cinzel text-[10px] tracking-widest text-parchment/80">
                                                {label} {isCurrent && <span className="text-gold ml-1">(TU)</span>}
                                            </span>
                                            <span className="font-spectral text-xs tabular-nums text-parchment/60">
                                                {percentage}%
                                            </span>
                                        </div>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: color }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, delay: 2.2 }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <p className="mt-8 text-center font-spectral text-[10px] text-parchment/30 italic">
                            Basato su {stats.total} anime sorteggiate
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
