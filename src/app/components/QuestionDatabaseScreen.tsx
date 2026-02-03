import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, ChevronUp, Database, Check } from 'lucide-react';
import { Language, getTranslation } from '../data/translations';
import { getActiveQuestionBank } from '../data/questionBank';
import type { QuestionBankLanguage } from '../data/questionBank';
import { CreditBar } from './CreditBar';

interface QuestionDatabaseScreenProps {
    language: Language;
}

type CategoryFilter = 'all' | 'general' | 'history' | 'sports';
type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard' | 'very-hard';

// Helper to convert Language type to QuestionBankLanguage
function toQuestionBankLanguage(lang: Language): QuestionBankLanguage {
    return lang === 'tr' ? 'tr' : 'en';
}

export function QuestionDatabaseScreen({ language }: QuestionDatabaseScreenProps) {
    const t = (key: any) => getTranslation(language, key);

    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
    const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    // Get the active question bank based on language
    const activeQuestionBank = getActiveQuestionBank(toQuestionBankLanguage(language));

    // Convert to legacy format for compatibility
    const triviaQuestions = activeQuestionBank.map(q => ({
        id: q.id,
        question: q.question,
        answers: q.answers,
        correctAnswer: q.correctAnswer,
        category: q.category === 'genel_kultur' ? 'general' as const :
            q.category === 'tarih' ? 'history' as const : 'sports' as const,
        difficulty: q.difficulty === 'kolay' ? 'easy' as const :
            q.difficulty === 'orta' ? 'medium' as const :
                q.difficulty === 'zor' ? 'hard' as const : 'very-hard' as const,
    }));

    // Filter questions based on search and filters
    const filteredQuestions = useMemo(() => {
        return triviaQuestions.filter((q) => {
            const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.answers.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = categoryFilter === 'all' || q.category === categoryFilter;
            const matchesDifficulty = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
            return matchesSearch && matchesCategory && matchesDifficulty;
        });
    }, [searchQuery, categoryFilter, difficultyFilter, activeQuestionBank]);

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'general': return 'var(--purple)';
            case 'history': return '#f59e0b';
            case 'sports': return 'var(--neon-green)';
            default: return 'var(--purple)';
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'var(--neon-green)';
            case 'medium': return '#f59e0b';
            case 'hard': return '#ef4444';
            case 'very-hard': return '#dc2626';
            default: return 'var(--gold)';
        }
    };

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'general': return language === 'en' ? 'General' : 'Genel';
            case 'history': return language === 'en' ? 'History' : 'Tarih';
            case 'sports': return language === 'en' ? 'Sports' : 'Spor';
            default: return category;
        }
    };

    const getDifficultyLabel = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return language === 'en' ? 'Easy' : 'Kolay';
            case 'medium': return language === 'en' ? 'Medium' : 'Orta';
            case 'hard': return language === 'en' ? 'Hard' : 'Zor';
            case 'very-hard': return language === 'en' ? 'Very Hard' : 'Çok Zor';
            default: return difficulty;
        }
    };

    return (
        <div className="min-h-screen pb-24 relative overflow-hidden">
            {/* Credit Bar */}
            <CreditBar language={language} />

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-darker)] to-[var(--bg-dark)]">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--purple)]/10 rounded-full blur-[100px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 pt-20">
                {/* Header */}
                <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <Database size={28} style={{ color: 'var(--gold)' }} />
                        <h1 style={{
                            fontSize: '24px',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, var(--gold) 0%, var(--purple) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            {t('questionDatabase')}
                        </h1>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                        {filteredQuestions.length} {language === 'en' ? 'questions' : 'soru'}
                    </p>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    className="mb-6 space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {/* Search Input */}
                    <div className="relative">
                        <Search
                            size={18}
                            style={{
                                position: 'absolute',
                                left: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'rgba(255,255,255,0.4)',
                            }}
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('searchQuestions')}
                            style={{
                                width: '100%',
                                padding: '12px 16px 12px 44px',
                                background: 'rgba(30, 30, 50, 0.9)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: 'white',
                                fontSize: '14px',
                                outline: 'none',
                            }}
                        />
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="flex gap-3">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                            style={{
                                flex: 1,
                                padding: '10px 14px',
                                background: 'rgba(30, 30, 50, 0.9)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px',
                                color: 'white',
                                fontSize: '13px',
                                outline: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <option value="all">{t('allCategories')}</option>
                            <option value="general">{getCategoryLabel('general')}</option>
                            <option value="history">{getCategoryLabel('history')}</option>
                            <option value="sports">{getCategoryLabel('sports')}</option>
                        </select>

                        <select
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
                            style={{
                                flex: 1,
                                padding: '10px 14px',
                                background: 'rgba(30, 30, 50, 0.9)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px',
                                color: 'white',
                                fontSize: '13px',
                                outline: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <option value="all">{t('allDifficulties')}</option>
                            <option value="easy">{getDifficultyLabel('easy')}</option>
                            <option value="medium">{getDifficultyLabel('medium')}</option>
                            <option value="hard">{getDifficultyLabel('hard')}</option>
                            <option value="very-hard">{getDifficultyLabel('very-hard')}</option>
                        </select>
                    </div>
                </motion.div>

                {/* Question List */}
                <motion.div
                    className="space-y-3 pb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {filteredQuestions.map((question, index) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            isExpanded={expandedId === question.id}
                            onToggle={() => setExpandedId(expandedId === question.id ? null : question.id)}
                            getCategoryColor={getCategoryColor}
                            getDifficultyColor={getDifficultyColor}
                            getCategoryLabel={getCategoryLabel}
                            getDifficultyLabel={getDifficultyLabel}
                            language={language}
                            index={index}
                        />
                    ))}

                    {filteredQuestions.length === 0 && (
                        <div className="text-center py-12">
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>
                                {language === 'en' ? 'No questions found' : 'Soru bulunamadı'}
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

// Define TriviaQuestion type locally for the QuestionCard component
type TriviaQuestion = {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: number;
    category: 'general' | 'history' | 'sports';
    difficulty: 'easy' | 'medium' | 'hard' | 'very-hard';
};

interface QuestionCardProps {
    question: TriviaQuestion;
    isExpanded: boolean;
    onToggle: () => void;
    getCategoryColor: (cat: string) => string;
    getDifficultyColor: (diff: string) => string;
    getCategoryLabel: (cat: string) => string;
    getDifficultyLabel: (diff: string) => string;
    language: Language;
    index: number;
}

function QuestionCard({
    question,
    isExpanded,
    onToggle,
    getCategoryColor,
    getDifficultyColor,
    getCategoryLabel,
    getDifficultyLabel,
    language,
    index,
}: QuestionCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            style={{
                background: 'rgba(30, 30, 50, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
            }}
        >
            {/* Header - Always visible */}
            <button
                onClick={onToggle}
                style={{
                    width: '100%',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: '10px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                }}
            >
                {/* Badges Row */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span
                        style={{
                            padding: '4px 10px',
                            background: `${getCategoryColor(question.category)}20`,
                            color: getCategoryColor(question.category),
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                        }}
                    >
                        {getCategoryLabel(question.category)}
                    </span>
                    <span
                        style={{
                            padding: '4px 10px',
                            background: `${getDifficultyColor(question.difficulty)}20`,
                            color: getDifficultyColor(question.difficulty),
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                        }}
                    >
                        {getDifficultyLabel(question.difficulty)}
                    </span>
                    <span
                        style={{
                            marginLeft: 'auto',
                            color: 'rgba(255,255,255,0.3)',
                            fontSize: '11px',
                        }}
                    >
                        #{question.id}
                    </span>
                </div>

                {/* Question Text */}
                <div className="flex items-start justify-between gap-3">
                    <p style={{
                        color: 'white',
                        fontSize: '14px',
                        lineHeight: 1.5,
                        flex: 1,
                    }}>
                        {question.question}
                    </p>
                    {isExpanded ? (
                        <ChevronUp size={20} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
                    ) : (
                        <ChevronDown size={20} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
                    )}
                </div>
            </button>

            {/* Expanded Content - Answer Choices */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div
                            style={{
                                padding: '0 16px 16px',
                                borderTop: '1px solid rgba(255,255,255,0.05)',
                            }}
                        >
                            <p style={{
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: '12px',
                                marginBottom: '10px',
                                marginTop: '12px',
                                fontWeight: 500,
                            }}>
                                {language === 'en' ? 'Answer Choices:' : 'Cevap Seçenekleri:'}
                            </p>
                            <div className="space-y-2">
                                {question.answers.map((answer: string, idx: number) => {
                                    const isCorrect = idx === question.correctAnswer;
                                    return (
                                        <div
                                            key={idx}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '10px 12px',
                                                background: isCorrect
                                                    ? 'rgba(0, 255, 136, 0.15)'
                                                    : 'rgba(255,255,255,0.03)',
                                                border: isCorrect
                                                    ? '1px solid rgba(0, 255, 136, 0.3)'
                                                    : '1px solid rgba(255,255,255,0.05)',
                                                borderRadius: '8px',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '6px',
                                                    background: isCorrect ? 'var(--neon-green)' : 'rgba(255,255,255,0.1)',
                                                    color: isCorrect ? 'black' : 'rgba(255,255,255,0.6)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {isCorrect ? <Check size={14} /> : String.fromCharCode(65 + idx)}
                                            </span>
                                            <span
                                                style={{
                                                    color: isCorrect ? 'var(--neon-green)' : 'rgba(255,255,255,0.8)',
                                                    fontSize: '13px',
                                                    fontWeight: isCorrect ? 600 : 400,
                                                }}
                                            >
                                                {answer}
                                            </span>
                                            {isCorrect && (
                                                <span
                                                    style={{
                                                        marginLeft: 'auto',
                                                        color: 'var(--neon-green)',
                                                        fontSize: '11px',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    ✓ {language === 'en' ? 'Correct' : 'Doğru'}
                                                </span>
                                            )}
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
}
