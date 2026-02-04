/**
 * Turkish Question Bank - Turkish-specific trivia questions
 * 
 * This module provides Turkish-specific content including:
 * - Turkish history, culture, geography
 * - Turkish sports and local celebrities
 * - Turkey-specific knowledge
 */

// Import batch files directly
import batch001 from './seeds/batch_001.json';
import batch003 from './seeds/batch_003_quality.json';
import batch004 from './seeds/batch_004_quality.json';

// Import shared types and helpers
import type { Question, Category, Difficulty, SportsSubcategory } from './questionBank';
import {
    normalizeQuestion,
    validateQuestion,
} from './questionBank';

// ============================================================================
// Batch Import Helpers (copied from questionBank.ts)
// ============================================================================

const categoryAliases: Record<string, Category> = {
    'genel_kultur': 'genel_kultur',
    'tarih': 'tarih',
    'spor': 'spor',
    'general': 'genel_kultur',
    'general_knowledge': 'genel_kultur',
    'history': 'tarih',
    'sports': 'spor',
};

const difficultyAliases: Record<string, Difficulty> = {
    'kolay': 'kolay',
    'orta': 'orta',
    'zor': 'zor',
    'cok_zor': 'cok_zor',
    'easy': 'kolay',
    'medium': 'orta',
    'hard': 'zor',
    'very_hard': 'cok_zor',
    'very-hard': 'cok_zor',
};

const subcategoryAliases: Record<string, SportsSubcategory> = {
    // Football
    'football': 'football',
    'futbol': 'football',
    // Basketball
    'basketball': 'basketball',
    'basketbol': 'basketball',
    // Turkish Sports (wrestling, volleyball, etc. - notable Turkish achievements)
    'turkish_sports': 'turkish_sports',
    'turk_sporlari': 'turkish_sports',
    'güreş': 'turkish_sports',
    'gures': 'turkish_sports',
    'voleybol': 'turkish_sports',
    // Legends & Records (Olympics, athletics, motorsport, etc.)
    'legends_records': 'legends_records',
    'efsaneler': 'legends_records',
    'olimpiyat': 'legends_records',
    'atletizm': 'legends_records',
    'motorsport': 'legends_records',
    'tenis': 'legends_records',
};

interface RawQuestion {
    id?: number | string;
    question?: string;
    // Old format
    answers?: string[];
    correctAnswer?: number;
    // New format
    choices?: string[];
    answerIndex?: number;
    // Common
    category?: string;
    difficulty?: string;
    // New optional fields (ignored by app but kept in JSON)
    lang?: string;
    subcategory?: string;
    explanation?: string;
    tags?: string[];
}

function processRawQuestion(raw: RawQuestion, index: number): Question | null {
    if (!raw.question || typeof raw.question !== 'string') return null;

    // Support both old (answers) and new (choices) format
    const answerArray = raw.choices || raw.answers;
    const correctIdx = raw.answerIndex ?? raw.correctAnswer;

    if (!Array.isArray(answerArray) || answerArray.length !== 4) return null;
    if (answerArray.some(a => typeof a !== 'string' || a.trim().length === 0)) return null;
    if (typeof correctIdx !== 'number' || correctIdx < 0 || correctIdx > 3) return null;

    const catNorm = (raw.category || '').toLowerCase().trim().replace(/[\s-]+/g, '_');
    const diffNorm = (raw.difficulty || '').toLowerCase().trim().replace(/[\s-]+/g, '_');

    const category = categoryAliases[catNorm];
    const difficulty = difficultyAliases[diffNorm];

    if (!category || !difficulty) return null;

    const id = typeof raw.id === 'number' ? raw.id :
        typeof raw.id === 'string' ? parseInt(raw.id, 10) || (1000 + index) :
            (1000 + index);

    // Process subcategory for sports questions
    const subNorm = (raw.subcategory || '').toLowerCase().trim().replace(/[\s-]+/g, '_');
    const subcategory = category === 'spor' ? subcategoryAliases[subNorm] : undefined;

    return {
        id,
        question: raw.question.trim(),
        answers: answerArray.map(a => a.trim()),
        correctAnswer: correctIdx,
        category,
        difficulty,
        subcategory,
    };
}

function importBatch(batch: RawQuestion[]): Question[] {
    const valid: Question[] = [];
    for (let i = 0; i < batch.length; i++) {
        const q = processRawQuestion(batch[i], i);
        if (q) valid.push(q);
    }
    return valid;
}

// ============================================================================
// Turkish Question Bank (From Batch Import with Advanced Deduplication)
// ============================================================================

import {
    dedupeQuestionsFull,
    logRejectedQuestion,
    logDeduplicationStats,
} from './questionDeduplication';

const importedQuestions = [
    ...importBatch(batch001 as RawQuestion[]),
    ...importBatch(batch003 as RawQuestion[]),
    ...importBatch(batch004 as RawQuestion[]),
];

// Apply advanced deduplication
const { cleaned, stats, rejected } = dedupeQuestionsFull(importedQuestions);

export const questionBankTR: Question[] = cleaned;

/**
 * Total number of questions in the Turkish question bank
 */
export const QUESTION_COUNT_TR = questionBankTR.length;

// Log in dev mode
if (import.meta.env.DEV) {
    logDeduplicationStats(stats, 'Turkish Question Bank');

    // Log first few rejected questions as examples
    if (rejected.length > 0) {
        console.log(`[Turkish Bank] Showing first 5 rejected questions:`);
        rejected.slice(0, 5).forEach(logRejectedQuestion);
        if (rejected.length > 5) {
            console.log(`  ... and ${rejected.length - 5} more`);
        }
    }
}

