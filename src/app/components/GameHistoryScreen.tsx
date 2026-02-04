import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Trash2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useGameHistory, QuestionRecord } from '../context/GameHistoryContext';
import { Language, getTranslation } from '../data/translations';
import { ExplanationModal } from './ExplanationModal';
import { fetchExplanation, ExplainResponse } from '../services/explainApi';

interface GameHistoryScreenProps {
    language: Language;
}

export function GameHistoryScreen({ language }: GameHistoryScreenProps) {
    const { runs, clearHistory } = useGameHistory();
    const [expandedRunId, setExpandedRunId] = useState<string | null>(null);
    const t = (key: any) => getTranslation(language, key);

    // AI Explanation state
    const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
    const [isExplainLoading, setIsExplainLoading] = useState(false);
    const [explainError, setExplainError] = useState<string | null>(null);
    const [explainData, setExplainData] = useState<ExplainResponse | null>(null);
    const [currentExplainQuestion, setCurrentExplainQuestion] = useState<{
        questionId: string;
        questionText: string;
        correctAnswer: string;
        userAnswer: string;
        category?: string;
        difficulty?: string;
    } | null>(null);

    const handleExplainClick = async (
        question: QuestionRecord,
        category?: string,
        difficulty?: string
    ) => {
        const questionData = {
            questionId: question.questionId,
            questionText: question.questionText,
            correctAnswer: question.correctAnswer,
            userAnswer: question.userAnswer,
            category,
            difficulty,
        };

        setCurrentExplainQuestion(questionData);
        setIsExplainModalOpen(true);
        setExplainData(null);
        setIsExplainLoading(true);
        setExplainError(null);

        try {
            const response = await fetchExplanation({
                questionId: question.questionId,
                questionText: question.questionText,
                choices: [question.correctAnswer, question.userAnswer],
                correctChoice: question.correctAnswer,
                selectedChoice: question.userAnswer,
                category: category,
                difficulty: difficulty,
                language: language,
            });

            if (response.success) {
                setExplainData(response);
            } else {
                setExplainError(response.error || 'Failed to get explanation');
            }
        } catch (err) {
            setExplainError('Failed to connect to explanation service');
        } finally {
            setIsExplainLoading(false);
        }
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return language === 'tr' ? 'Az önce' : 'Just now';
        if (diffMins < 60) return language === 'tr' ? `${diffMins} dk önce` : `${diffMins}m ago`;
        if (diffHours < 24) return language === 'tr' ? `${diffHours} saat önce` : `${diffHours}h ago`;
        if (diffDays < 7) return language === 'tr' ? `${diffDays} gün önce` : `${diffDays}d ago`;

        return date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
        });
    };

    const getCategoryLabel = (category: string) => {
        if (category === 'all') return language === 'tr' ? 'Tümü' : 'All';
        return category.charAt(0).toUpperCase() + category.slice(1);
    };

    const getDifficultyLabel = (difficulty: string) => {
        const labels: Record<string, { en: string; tr: string }> = {
            easy: { en: 'Easy', tr: 'Kolay' },
            medium: { en: 'Medium', tr: 'Orta' },
            hard: { en: 'Hard', tr: 'Zor' },
        };
        return labels[difficulty]?.[language] || difficulty;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return '#D4AF37';
            case 'lost': return '#ff3c50';
            case 'abandoned': return '#888';
            default: return '#888';
        }
    };

    const toggleRun = (runId: string) => {
        setExpandedRunId(prev => prev === runId ? null : runId);
    };

    return (
        <div
            className="min-h-screen relative overflow-hidden px-6 pb-24 pt-6"
            style={{ backgroundColor: '#0E0E16' }}
        >
            {/* Background gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(180deg, #0E0E16 0%, #1a1a2e 50%, #0E0E16 100%)',
                }}
            />

            {/* Subtle spotlight */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.06) 0%, transparent 60%)',
                }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1
                        className="text-4xl mb-2"
                        style={{
                            background: 'linear-gradient(180deg, #F4E4C1 0%, #D4AF37 50%, #A67C00 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontWeight: 800,
                        }}
                    >
                        {language === 'tr' ? 'Oyun Geçmişi' : 'Game History'}
                    </h1>
                    <p
                        className="text-sm"
                        style={{
                            color: 'rgba(236, 236, 236, 0.5)',
                            letterSpacing: '0.05em',
                        }}
                    >
                        {language === 'tr' ? 'Tüm oyunlar ve cevaplar' : 'All previous runs and answers'}
                    </p>
                </motion.div>

                {/* Clear history button */}
                {runs.length > 0 && (
                    <motion.button
                        className="mb-4 px-4 py-2 rounded-lg border flex items-center gap-2 mx-auto"
                        style={{
                            background: 'rgba(255, 60, 80, 0.1)',
                            borderColor: 'rgba(255, 60, 80, 0.3)',
                            color: '#ff3c50',
                            fontSize: '12px',
                        }}
                        whileHover={{
                            scale: 1.02,
                            borderColor: 'rgba(255, 60, 80, 0.5)',
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            if (confirm(language === 'tr' ? 'Tüm geçmişi silmek istediğinizden emin misiniz?' : 'Are you sure you want to clear all history?')) {
                                clearHistory();
                            }
                        }}
                    >
                        <Trash2 size={14} />
                        {language === 'tr' ? 'Geçmişi Temizle' : 'Clear History'}
                    </motion.button>
                )}

                {/* Runs list */}
                <div className="space-y-4">
                    {runs.length === 0 ? (
                        <motion.div
                            className="text-center py-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <p
                                className="text-lg mb-2"
                                style={{ color: 'rgba(236, 236, 236, 0.4)' }}
                            >
                                {language === 'tr' ? 'Henüz oyun geçmişi yok' : 'No game history yet'}
                            </p>
                            <p
                                className="text-sm"
                                style={{ color: 'rgba(236, 236, 236, 0.3)' }}
                            >
                                {language === 'tr' ? 'Bir oyun oynayarak başlayın' : 'Start playing to see your history'}
                            </p>
                        </motion.div>
                    ) : (
                        runs.map((run, index) => {
                            const isExpanded = expandedRunId === run.runId;
                            const accuracy = run.totalQuestions > 0
                                ? Math.round((run.correctCount / run.totalQuestions) * 100)
                                : 0;

                            return (
                                <motion.div
                                    key={run.runId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.4 }}
                                >
                                    {/* Run card header */}
                                    <button
                                        onClick={() => toggleRun(run.runId)}
                                        className="w-full rounded-lg border p-4 transition-all duration-300"
                                        style={{
                                            background: isExpanded
                                                ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(30, 30, 45, 0.8) 100%)'
                                                : 'linear-gradient(135deg, rgba(20, 20, 30, 0.8) 0%, rgba(30, 30, 45, 0.6) 100%)',
                                            borderColor: isExpanded
                                                ? 'rgba(212, 175, 55, 0.5)'
                                                : 'rgba(212, 175, 55, 0.2)',
                                            boxShadow: isExpanded
                                                ? '0 0 30px rgba(212, 175, 55, 0.2)'
                                                : 'none',
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 text-left">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span
                                                        className="text-xs font-semibold px-2 py-1 rounded"
                                                        style={{
                                                            background: `${getStatusColor(run.status)}20`,
                                                            color: getStatusColor(run.status),
                                                            border: `1px solid ${getStatusColor(run.status)}40`,
                                                        }}
                                                    >
                                                        {run.correctCount} / {run.totalQuestions}
                                                    </span>
                                                    <span className="text-xs" style={{ color: 'rgba(236, 236, 236, 0.4)' }}>
                                                        {accuracy}% {language === 'tr' ? 'doğru' : 'correct'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm" style={{ color: '#ECECEC' }}>
                                                    <span>{getCategoryLabel(run.category)}</span>
                                                    <span style={{ color: 'rgba(212, 175, 55, 0.5)' }}>•</span>
                                                    <span>{getDifficultyLabel(run.difficulty)}</span>
                                                    <span style={{ color: 'rgba(212, 175, 55, 0.5)' }}>•</span>
                                                    <span style={{ color: 'rgba(236, 236, 236, 0.5)' }}>{formatDate(run.timestamp)}</span>
                                                </div>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ChevronDown size={20} style={{ color: '#D4AF37' }} />
                                            </motion.div>
                                        </div>
                                    </button>

                                    {/* Expandable timeline */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div
                                                    className="mt-2 rounded-lg border p-4"
                                                    style={{
                                                        background: 'rgba(14, 14, 22, 0.6)',
                                                        borderColor: 'rgba(212, 175, 55, 0.15)',
                                                    }}
                                                >
                                                    {/* Questions timeline */}
                                                    <div className="space-y-3">
                                                        {run.questions.map((q, qIndex) => {
                                                            const questionNum = (q.questionIndex ?? qIndex) + 1;
                                                            return (
                                                                <div key={`${run.runId}-q${questionNum}`} className="flex items-start gap-3">
                                                                    {/* Question number + status badge */}
                                                                    <div
                                                                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold"
                                                                        style={{
                                                                            background: q.isCorrect
                                                                                ? 'rgba(0, 255, 136, 0.2)'
                                                                                : 'rgba(255, 60, 80, 0.2)',
                                                                            borderColor: q.isCorrect
                                                                                ? 'rgba(0, 255, 136, 0.6)'
                                                                                : 'rgba(255, 60, 80, 0.6)',
                                                                            color: q.isCorrect ? '#00ff88' : '#ff3c50',
                                                                        }}
                                                                    >
                                                                        {questionNum}
                                                                    </div>

                                                                    {/* Question content */}
                                                                    <div className="flex-1 min-w-0">
                                                                        <p
                                                                            className="text-sm mb-1"
                                                                            style={{ color: '#ECECEC' }}
                                                                        >
                                                                            {q.questionText}
                                                                        </p>
                                                                        <div className="flex flex-col gap-1 text-xs">
                                                                            <span style={{ color: q.isCorrect ? '#00ff88' : '#ff3c50' }}>
                                                                                {language === 'tr' ? 'Seçilen: ' : 'Selected: '}{q.userAnswer}
                                                                            </span>
                                                                            {!q.isCorrect && (
                                                                                <span style={{ color: 'rgba(0, 255, 136, 0.7)' }}>
                                                                                    {language === 'tr' ? 'Doğru: ' : 'Correct: '}{q.correctAnswer}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        {/* Explain with AI button for incorrect answers */}
                                                                        {!q.isCorrect && (
                                                                            <motion.button
                                                                                className="mt-2 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium"
                                                                                style={{
                                                                                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.08) 100%)',
                                                                                    border: '1px solid rgba(212, 175, 55, 0.3)',
                                                                                    color: '#D4AF37',
                                                                                }}
                                                                                whileHover={{
                                                                                    scale: 1.02,
                                                                                    borderColor: 'rgba(212, 175, 55, 0.5)',
                                                                                }}
                                                                                whileTap={{ scale: 0.98 }}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleExplainClick(q, run.category, run.difficulty);
                                                                                }}
                                                                            >
                                                                                <Sparkles size={12} />
                                                                                {language === 'tr' ? 'AI ile Açıkla' : 'Explain'}
                                                                            </motion.button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* AI Explanation Modal */}
            <ExplanationModal
                isOpen={isExplainModalOpen}
                onClose={() => {
                    setIsExplainModalOpen(false);
                    setCurrentExplainQuestion(null);
                }}
                language={language}
                isLoading={isExplainLoading}
                error={explainError}
                explanationMarkdown={explainData?.explanationMarkdown}
                memoryTip={explainData?.memoryTip}
                similarQuestion={explainData?.similarQuestion}
                cached={explainData?.cached}
            />
        </div>
    );
}
