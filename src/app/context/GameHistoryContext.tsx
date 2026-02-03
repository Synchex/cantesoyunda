import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Category } from '../components/CategorySelection';
import { Difficulty } from '../components/DifficultySelection';

export interface QuestionRecord {
    questionId: string;
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

    // Load history from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setRuns(parsed);
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
            runId: `run_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
            category,
            difficulty,
            questions: [],
            totalQuestions,
            correctCount: 0,
            prizeWon: 0,
        };
        setCurrentRun(newRun);
    };

    const recordAnswer = (question: QuestionRecord) => {
        if (!currentRun) return;

        setCurrentRun(prev => {
            if (!prev) return prev;

            const updatedQuestions = [...(prev.questions || []), question];
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

        const completedRun: GameRun = {
            runId: currentRun.runId,
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
