import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Category } from '../components/CategorySelection';
import { Difficulty } from '../components/DifficultySelection';

export interface QuestionRecord {
    questionId: string;
    questionIndex: number; // 0-based index of question in the run (for ordering and deduplication)
    questionText: string;
    selectedIndex: number;
    correctIndex: number;
    isCorrect: boolean;
    userAnswer: string;
    correctAnswer: string;
}

export interface GameRun {
    runId: string;
    timestamp: number;
    category: Category;
    difficulty: Difficulty;
    questions: QuestionRecord[];
    totalQuestions: number;
    correctCount: number;
    status: 'completed' | 'lost' | 'abandoned';
    prizeWon: number; // ArenaCoins won
}

interface GameHistoryContextType {
    runs: GameRun[];
    currentRun: Partial<GameRun> | null;
    startNewRun: (category: Category, difficulty: Difficulty, totalQuestions: number) => void;
    recordAnswer: (question: QuestionRecord) => void;
    finalizeRun: (status: 'completed' | 'lost' | 'abandoned', prizeWon: number) => void;
    clearHistory: () => void;
}

const GameHistoryContext = createContext<GameHistoryContextType | undefined>(undefined);

const STORAGE_KEY = 'trivia_game_history';
const MAX_RUNS = 50; // Limit stored runs to prevent excessive storage

export function GameHistoryProvider({ children }: { children: ReactNode }) {
    const [runs, setRuns] = useState<GameRun[]>([]);
    const [currentRun, setCurrentRun] = useState<Partial<GameRun> | null>(null);
    // Track finalized runIds to prevent double-finalization (StrictMode, etc.)
    const finalizedRunIdsRef = useRef<Set<string>>(new Set());

    // Load history from localStorage on mount with migration/cleanup
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed: GameRun[] = JSON.parse(stored);

                // MIGRATION: Clean up corrupted history data
                const cleanedRuns = parsed.map(run => {
                    if (!run.questions || run.questions.length === 0) {
                        return run;
                    }

                    // Deduplicate questions by questionIndex (keep last occurrence)
                    const questionMap = new Map<number, QuestionRecord>();
                    run.questions.forEach((q, idx) => {
                        // Use questionIndex if available, otherwise use array index
                        const key = q.questionIndex ?? idx;
                        questionMap.set(key, { ...q, questionIndex: key });
                    });

                    // Convert back to sorted array
                    const dedupedQuestions = Array.from(questionMap.values())
                        .sort((a, b) => a.questionIndex - b.questionIndex);

                    return {
                        ...run,
                        questions: dedupedQuestions,
                        correctCount: dedupedQuestions.filter(q => q.isCorrect).length,
                    };
                });

                // Remove any duplicate runs by runId (keep newest)
                const runMap = new Map<string, GameRun>();
                cleanedRuns.forEach(run => {
                    if (!runMap.has(run.runId) || run.timestamp > (runMap.get(run.runId)?.timestamp || 0)) {
                        runMap.set(run.runId, run);
                    }
                });

                const finalRuns = Array.from(runMap.values())
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .slice(0, MAX_RUNS);

                setRuns(finalRuns);

                // Save cleaned data back to localStorage
                if (JSON.stringify(finalRuns) !== stored) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalRuns));
                }
            }
        } catch (error) {
            console.error('Failed to load game history:', error);
        }
    }, []);

    // Save history to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
        } catch (error) {
            console.error('Failed to save game history:', error);
        }
    }, [runs]);

    const startNewRun = (category: Category, difficulty: Difficulty, totalQuestions: number) => {
        const newRun: Partial<GameRun> = {
            runId: `run_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
            timestamp: Date.now(),
            category,
            difficulty,
            questions: [],
            totalQuestions,
            correctCount: 0,
            prizeWon: 0,
        };
        setCurrentRun(newRun);
        // Clean up old finalized run IDs to prevent memory buildup (keep last 10)
        if (finalizedRunIdsRef.current.size > 10) {
            const arr = Array.from(finalizedRunIdsRef.current);
            finalizedRunIdsRef.current = new Set(arr.slice(-5));
        }
    };

    const recordAnswer = (question: QuestionRecord) => {
        if (!currentRun) return;

        setCurrentRun(prev => {
            if (!prev) return prev;

            const existingQuestions = prev.questions || [];

            // IDEMPOTENT: Check if this questionIndex already exists
            const existingIndex = existingQuestions.findIndex(
                q => q.questionIndex === question.questionIndex
            );

            let updatedQuestions: QuestionRecord[];
            if (existingIndex >= 0) {
                // Update existing entry instead of adding duplicate
                updatedQuestions = [...existingQuestions];
                updatedQuestions[existingIndex] = question;
            } else {
                // Add new entry
                updatedQuestions = [...existingQuestions, question];
            }

            // Sort by questionIndex to maintain order
            updatedQuestions.sort((a, b) => a.questionIndex - b.questionIndex);

            const correctCount = updatedQuestions.filter(q => q.isCorrect).length;

            return {
                ...prev,
                questions: updatedQuestions,
                correctCount,
            };
        });
    };

    const finalizeRun = (status: 'completed' | 'lost' | 'abandoned', prizeWon: number) => {
        if (!currentRun || !currentRun.runId) return;

        const runId = currentRun.runId;

        // IDEMPOTENT: Prevent double-finalization (StrictMode, multiple effect runs)
        if (finalizedRunIdsRef.current.has(runId)) {
            return;
        }
        finalizedRunIdsRef.current.add(runId);

        const completedRun: GameRun = {
            runId,
            timestamp: currentRun.timestamp || Date.now(),
            category: currentRun.category || 'all',
            difficulty: currentRun.difficulty || 'easy',
            questions: currentRun.questions || [],
            totalQuestions: currentRun.totalQuestions || 0,
            correctCount: currentRun.correctCount || 0,
            status,
            prizeWon,
        };

        setRuns(prev => {
            // Check if this run already exists in history (extra safety)
            if (prev.some(r => r.runId === runId)) {
                return prev;
            }
            // Add new run at the beginning (newest first)
            const updated = [completedRun, ...prev];
            // Limit to MAX_RUNS
            return updated.slice(0, MAX_RUNS);
        });

        setCurrentRun(null);
    };

    const clearHistory = () => {
        setRuns([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <GameHistoryContext.Provider
            value={{
                runs,
                currentRun,
                startNewRun,
                recordAnswer,
                finalizeRun,
                clearHistory,
            }}
        >
            {children}
        </GameHistoryContext.Provider>
    );
}

export function useGameHistory() {
    const context = useContext(GameHistoryContext);
    if (!context) {
        throw new Error('useGameHistory must be used within GameHistoryProvider');
    }
    return context;
}
