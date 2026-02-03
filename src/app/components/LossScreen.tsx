import { motion } from 'motion/react';
import { GameButton } from './GameButton';
import { X, CheckCircle2, AlertCircle, Trophy, Target } from 'lucide-react';
import { Language, getTranslation } from '../data/translations';
import { CreditBar } from './CreditBar';

interface LossScreenProps {
    correctAnswer: string;
    userAnswer: string;
    explanation?: string;
    correctCount: number;
    currentQuestion: number;
    totalQuestions: number;
    coinsEarned: number;
    onTryAgain: () => void;
    onGoHome: () => void;
    language: Language;
}

export function LossScreen({
    correctAnswer,
    userAnswer,
    explanation,
    correctCount,
    currentQuestion,
    totalQuestions,
    coinsEarned,
    onTryAgain,
    onGoHome,
    language,
}: LossScreenProps) {
    const t = (key: any, params?: any) => getTranslation(language, key, params);

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
            {/* Credit Bar */}
            <CreditBar language={language} />

            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-darker)] to-[var(--bg-dark)]">
                <motion.div
                    className="absolute inset-0 bg-[var(--wrong)]/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--wrong)]/20 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-2xl mx-auto">
                {/* Main Loss Message */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <motion.div
                        className="text-8xl mb-4"
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        💔
                    </motion.div>

                    <h1
                        className="text-6xl mb-4"
                        style={{
                            color: 'var(--wrong)',
                            fontWeight: 800,
                            textShadow: '0 0 40px var(--wrong)',
                        }}
                    >
                        {language === 'tr' ? 'Kaybettin!' : 'You Lost!'}
                    </h1>

                    <p className="text-xl text-[var(--muted-foreground)] mb-2">
                        {language === 'tr' ? 'Yanlış cevap verdin.' : 'Wrong answer.'}
                    </p>
                </motion.div>

                {/* Answer Comparison */}
                <motion.div
                    className="mb-8 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {/* Correct Answer */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-2 border-[var(--correct)] shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                        <div className="flex items-start gap-4">
                            <CheckCircle2 className="text-[var(--correct)] shrink-0 mt-1" size={24} />
                            <div className="flex-1">
                                <div className="text-sm text-[var(--correct)] mb-2 font-medium">
                                    {language === 'tr' ? 'Doğru Cevap:' : 'Correct Answer:'}
                                </div>
                                <div className="text-lg text-[var(--correct)]">{correctAnswer}</div>
                            </div>
                        </div>
                    </div>

                    {/* User's Wrong Answer */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-2 border-[var(--wrong)] shadow-[0_0_30px_rgba(255,23,68,0.3)]">
                        <div className="flex items-start gap-4">
                            <X className="text-[var(--wrong)] shrink-0 mt-1" size={24} />
                            <div className="flex-1">
                                <div className="text-sm text-[var(--wrong)] mb-2 font-medium">
                                    {language === 'tr' ? 'Senin Cevabın:' : 'Your Answer:'}
                                </div>
                                <div className="text-lg text-[var(--wrong)]">{userAnswer}</div>
                            </div>
                        </div>
                    </div>

                    {/* Explanation (if available) */}
                    {explanation && (
                        <motion.div
                            className="p-6 rounded-xl bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-2 border-[var(--border)]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="flex items-start gap-4">
                                <AlertCircle className="text-[var(--purple)] shrink-0 mt-1" size={24} />
                                <div className="flex-1">
                                    <div className="text-sm text-[var(--purple)] mb-2 font-medium">
                                        {language === 'tr' ? 'Açıklama:' : 'Explanation:'}
                                    </div>
                                    <div className="text-[var(--muted-foreground)]">{explanation}</div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Stats Summary */}
                <motion.div
                    className="grid grid-cols-3 gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-2 border-[var(--border)] text-center">
                        <Target className="mx-auto mb-2 text-[var(--neon-green)]" size={28} />
                        <div className="text-2xl text-[var(--neon-green)] mb-1">{correctCount}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">
                            {language === 'tr' ? 'Doğru' : 'Correct'}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-2 border-[var(--border)] text-center">
                        <Trophy className="mx-auto mb-2 text-[var(--purple)]" size={28} />
                        <div className="text-2xl text-[var(--purple)] mb-1">
                            {currentQuestion}/{totalQuestions}
                        </div>
                        <div className="text-xs text-[var(--muted-foreground)]">
                            {language === 'tr' ? 'Soru' : 'Question'}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-2 border-[var(--border)] text-center">
                        <motion.div
                            className="mx-auto mb-2 text-[var(--gold)] text-2xl"
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            🪙
                        </motion.div>
                        <div className="text-2xl text-[var(--gold)] mb-1">{coinsEarned}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">
                            {language === 'tr' ? 'Kazanılan' : 'Earned'}
                        </div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <GameButton
                        variant="gold"
                        size="lg"
                        onClick={onTryAgain}
                        className="w-full"
                    >
                        {language === 'tr' ? 'Tekrar Dene' : 'Try Again'}
                    </GameButton>

                    <GameButton
                        variant="secondary"
                        size="lg"
                        onClick={onGoHome}
                        className="w-full"
                    >
                        {language === 'tr' ? 'Ana Menü' : 'Main Menu'}
                    </GameButton>
                </motion.div>

                {/* Spotlight effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-60 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
