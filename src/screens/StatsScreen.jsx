import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function StatsScreen() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL || '/sda/api';

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_URL}/stats`);
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [API_URL]);

    return (
        <div className="h-dvh flex flex-col px-5 py-8 safe-area-top safe-area-bottom overflow-y-auto items-center justify-center">
            <motion.div
                className="w-full max-w-sm glass-dark rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="font-cinzel text-xl text-gold text-center tracking-[0.2em] mb-12">
                    L'ECCLESIA DELLE ANIME
                </h1>

                {loading ? (
                    <div className="text-center font-spectral text-parchment/50 py-12">
                        Interrogando il Fato...
                    </div>
                ) : (
                    <div className="space-y-10">
                        {['cavaliere', 'architetto', 'scriba'].map((id) => {
                            const count = stats?.stats[id] || 0;
                            const total = stats?.total || 1;
                            const percentage = Math.round((count / total) * 100);

                            const label = id === 'cavaliere' ? 'CAVALIERI' :
                                id === 'architetto' ? 'ARCHITETTI' : 'SCRIBI';

                            const color = id === 'cavaliere' ? '#C41E3A' :
                                id === 'architetto' ? '#4A7C59' : '#4169E1';

                            return (
                                <div key={id} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="font-cinzel text-xs tracking-widest text-parchment/80">
                                            {label}
                                        </span>
                                        <span className="font-spectral text-lg tabular-nums text-parchment/90">
                                            {count} <span className="text-xs text-parchment/40">({percentage}%)</span>
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>
                            );
                        })}

                        <div className="pt-8 border-t border-white/5 text-center">
                            <p className="font-spectral text-sm text-parchment/60">
                                Totale Anime Sorteggiate: <span className="text-gold font-bold">{stats?.total || 0}</span>
                            </p>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
