// Results data with ultra-hype Italian descriptions
export const results = {
    cavaliere: {
        id: 'cavaliere',
        title: 'IL CAVALIERE',
        subtitle: "L'Esploratore",
        tagline: 'Sei la Punta di Diamante.',
        description: "L'ariete che sfonda le porte della Loggia. Mentre gli altri esitano, tu sei già oltre l'ostacolo. Non conosci la paura, solo l'obiettivo. In CaTE 2026, sarai il Fuoco che guida la squadra attraverso le tenebre. Preparati a correre, a osare, a conquistare.",
        icon: '⚔️',
        color: '#C41E3A', // Crimson red for the warrior
        accentGradient: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 50%, #FF4500 100%)',
        traits: ['Coraggio', 'Azione', 'Leadership'],
        symbol: '𐍈', // Runic symbol
    },
    architetto: {
        id: 'architetto',
        title: "L'ARCHITETTO",
        subtitle: 'Il Costruttore',
        tagline: 'Sei il Maestro della Materia.',
        description: 'Il mondo è un caos che tu sai ordinare. Hai mani che creano e occhi che vedono la struttura nascosta delle cose. Non ti limiti a risolvere il problema: lo smonti e lo ricostruisci migliore. In CaTE 2026, sarai la Roccia su cui si fonderà la vittoria. Preparati a dare forma alla leggenda.',
        icon: '🏛️',
        color: '#4A7C59', // Forest green for the builder
        accentGradient: 'linear-gradient(135deg, #2E4A3A 0%, #4A7C59 50%, #6B8E23 100%)',
        traits: ['Precisione', 'Stabilità', 'Creazione'],
        symbol: '𐌀', // Runic symbol
    },
    scriba: {
        id: 'scriba',
        title: 'LO SCRIBA',
        subtitle: 'Il Maestro di Logica',
        tagline: "Sei l'Oracolo Silenzioso.",
        description: 'La mente che vede oltre il velo. Per te, ogni dettaglio è una parola in un codice universale. La tua arma non è la spada, ma la deduzione pura. In CaTE 2026, sarai la Luce della Ragione quando tutto sembrerà perduto nel buio. Preparati a pensare l\'impensabile e a decifrare l\'impossibile.',
        icon: '📜',
        color: '#4169E1', // Royal blue for the scholar
        accentGradient: 'linear-gradient(135deg, #191970 0%, #4169E1 50%, #87CEEB 100%)',
        traits: ['Saggezza', 'Deduzione', 'Conoscenza'],
        symbol: '𐌓', // Runic symbol
    },
};

// Calculate result based on scores
export function calculateResult(scores) {
    const { cavaliere, architetto, scriba } = scores;

    // Find the highest score
    const max = Math.max(cavaliere, architetto, scriba);

    // Determine winner (in case of tie, priority: scriba > architetto > cavaliere)
    if (scriba === max) return results.scriba;
    if (architetto === max) return results.architetto;
    return results.cavaliere;
}

// Get all possible results for display
export function getAllResults() {
    return Object.values(results);
}
