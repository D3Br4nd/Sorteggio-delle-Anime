import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import ParticleBackground from './components/ParticleBackground';
import DynamicBackground from './components/DynamicBackground';

// Screens
import LandingScreen from './screens/LandingScreen';
import QuizScreen from './screens/QuizScreen';
import TransitionScreen from './screens/TransitionScreen';
import ResultScreen from './screens/ResultScreen';

// Data
import { calculateResult } from './data/results';

// App states
const SCREENS = {
    LANDING: 'landing',
    QUIZ: 'quiz',
    TRANSITION: 'transition',
    RESULT: 'result',
};

export default function App() {
    const [currentScreen, setCurrentScreen] = useState(SCREENS.LANDING);
    const [backgroundTheme, setBackgroundTheme] = useState('dungeon');
    const [finalResult, setFinalResult] = useState(null);
    const [scores, setScores] = useState(null);

    // Handle starting the quiz
    const handleStart = useCallback(() => {
        setCurrentScreen(SCREENS.QUIZ);
        setBackgroundTheme('dungeon');
    }, []);

    // Handle background changes during quiz
    const handleBackgroundChange = useCallback((theme) => {
        setBackgroundTheme(theme);
    }, []);

    // Handle quiz completion
    const handleQuizComplete = useCallback((finalScores) => {
        setScores(finalScores);
        setCurrentScreen(SCREENS.TRANSITION);
        setBackgroundTheme('temple');
    }, []);

    // Handle transition completion
    const handleTransitionComplete = useCallback(() => {
        const result = calculateResult(scores);
        setFinalResult(result);
        setCurrentScreen(SCREENS.RESULT);
    }, [scores]);

    // Handle restart
    const handleRestart = useCallback(() => {
        setCurrentScreen(SCREENS.LANDING);
        setBackgroundTheme('dungeon');
        setFinalResult(null);
        setScores(null);
    }, []);

    return (
        <div className="relative min-h-dvh overflow-hidden no-select">
            {/* Branding Footer - Hidden on very small height screens to avoid covering buttons */}
            <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-between items-center px-6 py-4 pointer-events-none sm:opacity-100 opacity-0 transition-opacity duration-500">
                <motion.img
                    src="mini-icon-plv-white.png"
                    alt="PLV Icon"
                    className="h-6 w-auto opacity-40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.4, y: 0 }}
                    transition={{ delay: 1 }}
                />
                <motion.img
                    src="solo-logo-white.png"
                    alt="Logo"
                    className="h-6 w-auto opacity-40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.4, y: 0 }}
                    transition={{ delay: 1 }}
                />
            </div>

            {/* Dynamic Background Layer */}
            <DynamicBackground theme={backgroundTheme}>
                {/* Particle Effects */}
                <ParticleBackground
                    type={currentScreen === SCREENS.TRANSITION ? 'ember' : 'dust'}
                    intensity={currentScreen === SCREENS.RESULT ? 'high' : 'medium'}
                />

                {/* Screen Content */}
                <AnimatePresence mode="wait">
                    {currentScreen === SCREENS.LANDING && (
                        <motion.div
                            key="landing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <LandingScreen onStart={handleStart} />
                        </motion.div>
                    )}

                    {currentScreen === SCREENS.QUIZ && (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <QuizScreen
                                onComplete={handleQuizComplete}
                                onBackgroundChange={handleBackgroundChange}
                            />
                        </motion.div>
                    )}

                    {currentScreen === SCREENS.TRANSITION && (
                        <motion.div
                            key="transition"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <TransitionScreen onComplete={handleTransitionComplete} />
                        </motion.div>
                    )}

                    {currentScreen === SCREENS.RESULT && finalResult && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ResultScreen result={finalResult} onRestart={handleRestart} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </DynamicBackground>
        </div>
    );
}
