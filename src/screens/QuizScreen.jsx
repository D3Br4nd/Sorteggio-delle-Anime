import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RuneProgress from '../components/RuneProgress';
import AnswerCard from '../components/AnswerCard';
import GlowButton from '../components/GlowButton';
import { questions } from '../data/questions';

export default function QuizScreen({ onComplete, onBackgroundChange }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [scores, setScores] = useState({ cavaliere: 0, architetto: 0, scriba: 0 });
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    // Update background when question changes
    const handleQuestionChange = (newIndex) => {
        if (onBackgroundChange && questions[newIndex]) {
            onBackgroundChange(questions[newIndex].backgroundHue);
        }
    };

    const handleAnswerSelect = (answer) => {
        if (isTransitioning) return;
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        if (!selectedAnswer || isTransitioning) return;

        setIsTransitioning(true);

        // Add points from selected answer
        const newScores = {
            cavaliere: scores.cavaliere + selectedAnswer.points.cavaliere,
            architetto: scores.architetto + selectedAnswer.points.architetto,
            scriba: scores.scriba + selectedAnswer.points.scriba,
        };
        setScores(newScores);

        // Delay for animation
        setTimeout(() => {
            if (isLastQuestion) {
                onComplete(newScores);
            } else {
                const nextIndex = currentQuestionIndex + 1;
                setCurrentQuestionIndex(nextIndex);
                setSelectedAnswer(null);
                handleQuestionChange(nextIndex);
            }
            setIsTransitioning(false);
        }, 400);
    };

    // Initialize background on mount
    useState(() => {
        handleQuestionChange(0);
    });

    return (
        <div className="min-h-screen flex flex-col px-5 py-6 safe-area-top safe-area-bottom">
            {/* Progress */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <RuneProgress currentQuestion={currentQuestionIndex} />
            </motion.div>

            {/* Question Card */}
            <div className="flex-1 flex flex-col justify-center py-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Question Number */}
                        <motion.div
                            className="text-center mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="font-cinzel text-gold/60 text-sm tracking-widest">
                                DOMANDA {currentQuestionIndex + 1} DI {questions.length}
                            </span>
                        </motion.div>

                        {/* Question Text */}
                        <motion.div
                            className="glass-dark rounded-2xl p-6 mb-6 border-glow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="font-spectral text-xl text-parchment-light leading-relaxed text-center">
                                {currentQuestion.question}
                            </h2>
                        </motion.div>

                        {/* Answer Cards */}
                        <div className="space-y-4">
                            {currentQuestion.answers.map((answer, index) => (
                                <AnswerCard
                                    key={answer.id}
                                    answer={answer}
                                    isSelected={selectedAnswer?.id === answer.id}
                                    onSelect={handleAnswerSelect}
                                    index={index}
                                />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Continue Button - Pushed up to avoid footer logos */}
            <motion.div
                className="mt-auto pb-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <AnimatePresence>
                    {selectedAnswer && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="flex justify-center"
                        >
                            <GlowButton
                                onClick={handleNext}
                                disabled={isTransitioning}
                                className="w-full max-w-sm"
                            >
                                {isLastQuestion ? 'RIVELA IL MIO DESTINO' : 'CONTINUA'}
                            </GlowButton>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Placeholder to maintain layout */}
                {!selectedAnswer && (
                    <div className="h-16" />
                )}
            </motion.div>
        </div>
    );
}
