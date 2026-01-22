// Questions data with Italian text, point values, and background themes
export const questions = [
    {
        id: 1,
        theme: 'obstacle',
        backgroundHue: 'dungeon',
        question: 'Ti trovi davanti al vecchio portone chiuso di un castello in rovina. Il tuo primo istinto è:',
        answers: [
            {
                id: 'a',
                text: 'Cerco un punto debole nelle mura per arrampicarmi.',
                icon: '⚔️',
                points: { cavaliere: 2, architetto: 0, scriba: 0 }
            },
            {
                id: 'b',
                text: 'Studio la serratura e i cardini: se è stato chiuso, si può aprire.',
                icon: '🔧',
                points: { cavaliere: 0, architetto: 2, scriba: 0 }
            },
            {
                id: 'c',
                text: 'Cerco iscrizioni nascoste che rivelino un passaggio segreto.',
                icon: '📜',
                points: { cavaliere: 0, architetto: 0, scriba: 2 }
            }
        ]
    },
    {
        id: 2,
        theme: 'crisis',
        backgroundHue: 'storm',
        question: 'In una situazione di pericolo improvviso, qual è il tuo contributo migliore?',
        answers: [
            {
                id: 'a',
                text: "L'azione immediata. Non c'è tempo per pensare, bisogna muoversi.",
                icon: '🏃',
                points: { cavaliere: 2, architetto: 0, scriba: 0 }
            },
            {
                id: 'b',
                text: 'La concretezza. Trasformo le idee astratte in soluzioni reali e tangibili.',
                icon: '🛠️',
                points: { cavaliere: 0, architetto: 2, scriba: 0 }
            },
            {
                id: 'c',
                text: "L'analisi. Metto ordine nel caos e trovo il collegamento logico che manca.",
                icon: '🔍',
                points: { cavaliere: 0, architetto: 0, scriba: 2 }
            }
        ]
    },
    {
        id: 3,
        theme: 'gift',
        backgroundHue: 'treasure',
        question: 'I Cavalieri di Alabastro ti offrono un dono per la missione. Cosa scegli?',
        answers: [
            {
                id: 'a',
                text: 'Una bussola antica che indica sempre la via, anche al buio.',
                icon: '🧭',
                points: { cavaliere: 2, architetto: 0, scriba: 0 }
            },
            {
                id: 'b',
                text: 'Strumenti di precisione capaci di misurare e plasmare la materia.',
                icon: '📐',
                points: { cavaliere: 0, architetto: 2, scriba: 0 }
            },
            {
                id: 'c',
                text: 'Un codice criptato che contiene la verità sulla storia del mondo.',
                icon: '📖',
                points: { cavaliere: 0, architetto: 0, scriba: 2 }
            }
        ]
    },
    {
        id: 4,
        theme: 'fear',
        backgroundHue: 'void',
        question: 'Cosa temi di più durante una missione?',
        answers: [
            {
                id: 'a',
                text: 'Restare immobile senza poter agire (La Paralisi).',
                icon: '⛓️',
                points: { cavaliere: 1, architetto: 0, scriba: 0 }
            },
            {
                id: 'b',
                text: 'Che la struttura o il piano crolli per un difetto di base (Il Crollo).',
                icon: '🏚️',
                points: { cavaliere: 0, architetto: 1, scriba: 0 }
            },
            {
                id: 'c',
                text: "Non avere abbastanza informazioni per capire (L'Ignoranza).",
                icon: '❓',
                points: { cavaliere: 0, architetto: 0, scriba: 1 }
            }
        ]
    },
    {
        id: 5,
        theme: 'team',
        backgroundHue: 'crossroads',
        question: 'La squadra è divisa su quale sentiero prendere. Come risolvi l\'impasse?',
        answers: [
            {
                id: 'a',
                text: 'Scelgo la via più diretta e faccio strada. Mi seguiranno.',
                icon: '👑',
                points: { cavaliere: 2, architetto: 0, scriba: 0 }
            },
            {
                id: 'b',
                text: 'Valuto quale percorso offre il terreno più stabile e sicuro per tutti.',
                icon: '🗺️',
                points: { cavaliere: 0, architetto: 2, scriba: 0 }
            },
            {
                id: 'c',
                text: 'Riconsulto gli indizi per trovare la via logicamente corretta.',
                icon: '🔮',
                points: { cavaliere: 0, architetto: 0, scriba: 2 }
            }
        ]
    },
    {
        id: 6,
        theme: 'motivation',
        backgroundHue: 'throne',
        question: 'Cosa cerchi veramente alla fine di questa Caccia?',
        answers: [
            {
                id: 'a',
                text: "La gloria della conquista e l'adrenalina della sfida.",
                icon: '🏆',
                points: { cavaliere: 2, architetto: 0, scriba: 0 }
            },
            {
                id: 'b',
                text: 'La soddisfazione di aver costruito una vittoria solida e innegabile.',
                icon: '🏛️',
                points: { cavaliere: 0, architetto: 2, scriba: 0 }
            },
            {
                id: 'c',
                text: 'La comprensione del mistero finale che si cela dietro Venticano.',
                icon: '🌟',
                points: { cavaliere: 0, architetto: 0, scriba: 2 }
            }
        ]
    },
    {
        id: 7,
        theme: 'motto',
        backgroundHue: 'temple',
        question: 'Quale frase risuona nella tua anima?',
        answers: [
            {
                id: 'a',
                text: 'Non esiste muro che non possa essere scavalcato.',
                icon: '🦅',
                points: { cavaliere: 2, architetto: 0, scriba: 0 }
            },
            {
                id: 'b',
                text: 'Le fondamenta forti reggono il peso dei secoli.',
                icon: '🏰',
                points: { cavaliere: 0, architetto: 2, scriba: 0 }
            },
            {
                id: 'c',
                text: 'La verità è scritta tra le righe, per chi sa leggere.',
                icon: '✨',
                points: { cavaliere: 0, architetto: 0, scriba: 2 }
            }
        ]
    }
];

// Background gradient configurations per question theme
export const backgroundThemes = {
    dungeon: {
        gradient: 'linear-gradient(180deg, #0a0505 0%, #1a0f0f 40%, #0d0505 100%)',
        accent: 'rgba(139, 69, 19, 0.1)',
        shapes: ['triangle', 'circle-cross'],
    },
    storm: {
        gradient: 'linear-gradient(180deg, #050708 0%, #0f1520 40%, #050505 100%)',
        accent: 'rgba(100, 149, 237, 0.1)',
        shapes: ['zig-zag', 'lightning'],
    },
    treasure: {
        gradient: 'linear-gradient(180deg, #0a0805 0%, #1f1a0f 40%, #0a0705 100%)',
        accent: 'rgba(212, 175, 55, 0.15)',
        shapes: ['diamond', 'pentagon-star'],
    },
    void: {
        gradient: 'linear-gradient(180deg, #020202 0%, #0a0505 40%, #000000 100%)',
        accent: 'rgba(75, 0, 130, 0.1)',
        shapes: ['spiral', 'concentric-circles'],
    },
    crossroads: {
        gradient: 'linear-gradient(180deg, #080a05 0%, #151a0f 40%, #050805 100%)',
        accent: 'rgba(34, 139, 34, 0.1)',
        shapes: ['path-split', 'intersection'],
    },
    throne: {
        gradient: 'linear-gradient(180deg, #0a0508 0%, #1a0f1f 40%, #080508 100%)',
        accent: 'rgba(148, 0, 211, 0.1)',
        shapes: ['crown-crest', 'sword-vertical'],
    },
    temple: {
        gradient: 'linear-gradient(180deg, #0a0a05 0%, #1a1a0f 40%, #0a0a05 100%)',
        accent: 'rgba(212, 175, 55, 0.2)',
        shapes: ['eye-wisdom', 'scroll-seal'],
    },
};
