/**
 * Turkish Question Bank - Turkish-specific trivia questions
 * 
 * This module provides Turkish-specific content including:
 * - Turkish history, culture, geography
 * - Turkish sports and local celebrities
 * - Turkey-specific knowledge
 */

// Import batch files directly
// batch001 removed - replaced by batch021_gk_revamp
// batch003 and batch004 removed - replaced by batch021_gk_revamp (Hard Mode)
import batch005 from './seeds/batch_005_general_sports.json';
import batch006 from './seeds/batch_006_tr_sports.json';
import batch007 from './seeds/batch_007_tr_history_ilk.json';
import batch008 from './seeds/batch_008_tr_history_orta.json';
import batch009 from './seeds/batch_009_tr_history_yeni.json';
import batch010 from './seeds/batch_010_tr_history_yakin.json';
import batch011 from './seeds/batch_011_tr_history_antik_anadolu.json';
import batch012 from './seeds/batch_012_tr_history_modern_dunya.json';
import batch013 from './seeds/batch_013_tr_history_ilk_more.json';
import batch014 from './seeds/batch_014_tr_history_orta_more.json';
import batch015 from './seeds/batch_015_tr_history_yeni_more.json';
import batch016 from './seeds/batch_016_tr_history_yakin_more.json';
import batch017 from './seeds/batch_017_tr_sports_football.json';
import batch018 from './seeds/batch_018_tr_sports_basketball.json';
import batch019 from './seeds/batch_019_tr_sports_general.json';
import batch020 from './seeds/batch_020_tr_sports_legends.json';
import batch021 from './seeds/batch_021_gk_revamp.json';

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

    'easy': 'kolay',
    'medium': 'orta',
    'hard': 'zor',


};

const subcategoryAliases: Record<string, SportsSubcategory> = {
    // General Sports (all mixed)
    'general_sports': 'general_sports',
    'genel_spor': 'general_sports',
    // General Football (world football)
    'general_football': 'general_football',
    'genel_futbol': 'general_football',
    // Football (base subcategory for football questions)
    'football': 'football',
    'futbol': 'football',
    // Turkish Football (TR-only, maps to football questions)
    'turkish_football': 'turkish_football',
    'turk_futbolu': 'turkish_football',
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

    // Preserve tags for history filtering
    const tags = Array.isArray(raw.tags) ? raw.tags : undefined;

    return {
        id,
        question: raw.question.trim(),
        answers: answerArray.map(a => a.trim()),
        correctAnswer: correctIdx,
        category,
        difficulty,
        subcategory,
        tags,
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
    // ...importBatch(batch001 as RawQuestion[]), // Removed - Replaced by batch021
    // ...importBatch(batch003 as RawQuestion[]), // Removed
    // ...importBatch(batch004 as RawQuestion[]), // Removed
    ...importBatch(batch005 as RawQuestion[]),
    ...importBatch(batch006 as RawQuestion[]),
    ...importBatch(batch007 as RawQuestion[]),
    ...importBatch(batch008 as RawQuestion[]),
    ...importBatch(batch009 as RawQuestion[]),
    ...importBatch(batch010 as RawQuestion[]),
    ...importBatch(batch011 as RawQuestion[]),
    ...importBatch(batch012 as RawQuestion[]),
    ...importBatch(batch013 as RawQuestion[]),
    ...importBatch(batch014 as RawQuestion[]),
    ...importBatch(batch015 as RawQuestion[]),
    ...importBatch(batch016 as RawQuestion[]),
    ...importBatch(batch017 as RawQuestion[]),
    ...importBatch(batch018 as RawQuestion[]),
    ...importBatch(batch019 as RawQuestion[]),
    ...importBatch(batch020 as RawQuestion[]),
    ...importBatch(batch021 as RawQuestion[]),
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

