import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CircularTimer } from './CircularTimer';
import { ProgressBar } from './ProgressBar';
import { Coins, Zap } from 'lucide-react';
import { Language, getTranslation } from '@/app/data/translations';

interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  coins: number;
  streak: number;
  onAnswer: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
  language: Language;
}

export function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  coins,
  streak,
  onAnswer,
  onNextQuestion,
  language,
}: QuestionScreenProps) {
  const t = (key: any, params?: any) => getTranslation(language, key, params);
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    // Reset state when question changes
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setTimeUp(false);
  }, [question.id]);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null || timeUp) return;
    
    setSelectedAnswer(index);
    const correct = index === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    onAnswer(correct);

    // Auto advance after showing result
    setTimeout(() => {
      onNextQuestion();
    }, 2000);
  };

  const handleTimeUp = () => {
    if (selectedAnswer !== null) return;
    
    setTimeUp(true);
    setShowResult(true);
    setIsCorrect(false);
    onAnswer(false);

    setTimeout(() => {
      onNextQuestion();
    }, 2000);
  };

  const getAnswerStyle = (index: number) => {
    if (!showResult) {
      return 'border-[var(--border)] hover:border-[var(--purple)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]';
    }

    if (index === question.correctAnswer) {
      return 'border-[var(--correct)] shadow-[0_0_30px_rgba(0,255,136,0.6)] bg-gradient-to-br from-[var(--correct)]/20 to-[var(--correct)]/10';
    }

    if (index === selectedAnswer && !isCorrect) {
      return 'border-[var(--wrong)] shadow-[0_0_30px_rgba(255,23,68,0.6)] bg-gradient-to-br from-[var(--wrong)]/20 to-[var(--wrong)]/10';
    }

    return 'border-[var(--border)] opacity-50';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-darker)] to-[var(--bg-dark)]">
        {showResult && isCorrect && (
          <motion.div
            className="absolute inset-0 bg-[var(--correct)]/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        {showResult && !isCorrect && (
          <motion.div
            className="absolute inset-0 bg-[var(--wrong)]/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        {/* Top Stats Bar */}
        <div className="mb-8 flex items-center justify-between">
          {/* Coins */}
          <motion.div 
            className="flex items-center gap-2 bg-[var(--card)] px-4 py-2 rounded-full border-2 border-[var(--gold)]"
            animate={showResult && isCorrect ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Coins className="text-[var(--gold)]" size={24} />
            <span className="text-xl text-[var(--gold)]">{coins}</span>
          </motion.div>

          {/* Timer */}
          <CircularTimer 
            duration={20} 
            onComplete={handleTimeUp}
            size={80}
          />

          {/* Streak */}
          <motion.div 
            className="flex items-center gap-2 bg-[var(--card)] px-4 py-2 rounded-full border-2 border-[var(--neon-green)]"
            animate={streak > 0 ? { 
              boxShadow: [
                '0 0 20px rgba(0,255,136,0.3)',
                '0 0 30px rgba(0,255,136,0.6)',
                '0 0 20px rgba(0,255,136,0.3)',
              ]
            } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Zap className="text-[var(--neon-green)]" size={24} />
            <span className="text-xl text-[var(--neon-green)]">{streak}x</span>
          </motion.div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={questionNumber} total={totalQuestions} language={language} />
        </div>

        {/* Question Card */}
        <motion.div
          className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-2 border-[var(--border)] shadow-[0_0_40px_rgba(168,85,247,0.3)]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl text-center leading-relaxed">
            {question.question}
          </h2>
        </motion.div>

        {/* Answers */}
        <div className="grid grid-cols-1 gap-4">
          {question.answers.map((answer, index) => (
            <motion.button
              key={index}
              className={`
                relative p-6 rounded-2xl text-left text-lg
                bg-gradient-to-br from-[var(--card)] to-[var(--muted)]
                border-2 transition-all duration-300
                ${getAnswerStyle(index)}
                ${selectedAnswer === null && !timeUp ? 'cursor-pointer' : 'cursor-default'}
              `}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedAnswer !== null || timeUp}
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                ...(showResult && index === selectedAnswer && !isCorrect ? {
                  x: [0, -10, 10, -10, 10, 0],
                } : {})
              }}
              transition={{ 
                delay: index * 0.1,
                duration: showResult && index === selectedAnswer && !isCorrect ? 0.5 : 0.4
              }}
              whileHover={selectedAnswer === null && !timeUp ? { scale: 1.02, x: 10 } : {}}
              whileTap={selectedAnswer === null && !timeUp ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--purple)]/20 border-2 border-[var(--purple)] flex items-center justify-center text-[var(--purple)] shrink-0">
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{answer}</span>
              </div>

              {/* Particle burst on correct answer */}
              <AnimatePresence>
                {showResult && index === question.correctAnswer && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-[var(--correct)] rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                        initial={{ opacity: 1, scale: 0 }}
                        animate={{
                          opacity: 0,
                          scale: 1,
                          x: Math.cos((i * Math.PI * 2) / 8) * 100,
                          y: Math.sin((i * Math.PI * 2) / 8) * 100,
                        }}
                        transition={{ duration: 0.8 }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        {/* Result Message */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {isCorrect ? (
                <div className="text-3xl text-[var(--correct)]">
                  {t('correct')}
                </div>
              ) : (
                <div className="text-3xl text-[var(--wrong)]">
                  {timeUp ? t('timeUp') : t('wrongAnswer')}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}