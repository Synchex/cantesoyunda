/**
 * Question Bank - Language-Aware Question Bank System
 * 
 * This module provides:
 * - Strongly typed Question interface with Turkish category/difficulty names
 * - Language-specific question banks (Turkish and English)
 * - Helper functions for normalization, validation, and deduplication
 * - Smart language-based question selection
 */

// ============================================================================
// Type Definitions
// ============================================================================

export type Category = 'genel_kultur' | 'tarih' | 'spor';
export type Difficulty = 'kolay' | 'orta' | 'zor' | 'cok_zor';
export type SportsSubcategory = 'football' | 'basketball' | 'turkish_sports' | 'legends_records';

export interface Question {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: number; // Index of the correct answer (0-3)
    category: Category;
    difficulty: Difficulty;
    subcategory?: SportsSubcategory; // Only applicable for 'spor' category
}

// ============================================================================
// Validation Result Type
// ============================================================================

export interface ValidationResult {
    valid: boolean;
    reason?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Normalizes a question by trimming whitespace and normalizing text
 */
export function normalizeQuestion(q: Question): Question {
    return {
        ...q,
        question: q.question.trim().replace(/\s+/g, ' '),
        answers: q.answers.map(a => a.trim().replace(/\s+/g, ' ')),
    };
}

/**
 * Validates a question and returns whether it's valid with a reason if not
 */
export function validateQuestion(q: Partial<Question>): ValidationResult {
    // Check required fields
    if (typeof q.id !== 'number') {
        return { valid: false, reason: 'Missing or invalid id' };
    }

    if (!q.question || typeof q.question !== 'string' || q.question.trim().length === 0) {
        return { valid: false, reason: 'Missing or empty question text' };
    }

    if (!Array.isArray(q.answers) || q.answers.length !== 4) {
        return { valid: false, reason: 'Must have exactly 4 answers' };
    }

    if (q.answers.some(a => typeof a !== 'string' || a.trim().length === 0)) {
        return { valid: false, reason: 'All answers must be non-empty strings' };
    }

    if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
        return { valid: false, reason: 'correctAnswer must be 0, 1, 2, or 3' };
    }

    const validCategories: Category[] = ['genel_kultur', 'tarih', 'spor'];
    if (!q.category || !validCategories.includes(q.category)) {
        return { valid: false, reason: `category must be one of: ${validCategories.join(', ')}` };
    }

    const validDifficulties: Difficulty[] = ['kolay', 'orta', 'zor', 'cok_zor'];
    if (!q.difficulty || !validDifficulties.includes(q.difficulty)) {
        return { valid: false, reason: `difficulty must be one of: ${validDifficulties.join(', ')}` };
    }

    return { valid: true };
}

/**
 * Generates a normalized key for deduplication (based on question text + sorted answers)
 */
function getDedupeKey(q: Question): string {
    const normalizedQ = normalizeQuestion(q);
    const sortedAnswers = [...normalizedQ.answers].sort().join('|');
    return `${normalizedQ.question.toLowerCase()}::${sortedAnswers.toLowerCase()}`;
}

/**
 * Removes duplicate questions based on normalized question text and choices
 */
export function dedupeQuestions(questions: Question[]): Question[] {
    const seen = new Map<string, Question>();

    for (const q of questions) {
        const key = getDedupeKey(q);
        if (!seen.has(key)) {
            seen.set(key, q);
        }
    }

    return Array.from(seen.values());
}

// ============================================================================
// Language-Specific Question Banks
// ============================================================================

import { questionBankTR, QUESTION_COUNT_TR } from './questionBank_tr';
import { questionBankEN, QUESTION_COUNT_EN } from './questionBank_en';

/**
 * Language type for question bank selection
 */
export type QuestionBankLanguage = 'tr' | 'en';

/**
 * Get the active question bank based on language
 */
export function getActiveQuestionBank(language: QuestionBankLanguage = 'en'): Question[] {
    return language === 'tr' ? questionBankTR : questionBankEN;
}

/**
 * Get the question count for active language bank
 */
export function getQuestionCount(language: QuestionBankLanguage = 'en'): number {
    return language === 'tr' ? QUESTION_COUNT_TR : QUESTION_COUNT_EN;
}

/**
 * Master Question Bank (defaults to English for backward compatibility)
 * @deprecated Use getActiveQuestionBank(language) instead
 */
export const questionBank: Question[] = questionBankEN;

/**
 * Total number of questions in the question bank
 * @deprecated Use getQuestionCount(language) instead
 */
export const QUESTION_COUNT = questionBankEN.length;

// Export both language banks for direct access if needed
export { questionBankTR, questionBankEN, QUESTION_COUNT_TR, QUESTION_COUNT_EN };

// ============================================================================
// Query Options
// ============================================================================

export interface GetQuestionsOptions {
    category?: Category | 'all';
    difficulty?: Difficulty | 'all';
    subcategory?: SportsSubcategory;
    limit?: number;
    shuffle?: boolean;
    language?: QuestionBankLanguage;
}

/**
 * Retrieves questions based on filter options
 */
export function getQuestions(options: GetQuestionsOptions = {}): Question[] {
    const {
        category = 'all',
        difficulty = 'all',
        subcategory,
        limit,
        shuffle = true,
        language = 'en'
    } = options;

    // Get the active question bank based on language
    const activeBank = getActiveQuestionBank(language);
    let filtered = [...activeBank];

    // Filter by category
    if (category !== 'all') {
        filtered = filtered.filter(q => q.category === category);
    }

    // Filter by subcategory (only applicable for sports category)
    if (subcategory) {
        filtered = filtered.filter(q => q.subcategory === subcategory);
    }

    // Filter by difficulty
    if (difficulty !== 'all') {
        filtered = filtered.filter(q => q.difficulty === difficulty);
    }

    // Shuffle if requested
    if (shuffle) {
        filtered = filtered.sort(() => Math.random() - 0.5);
    }

    // Apply limit if specified
    if (limit !== undefined && limit > 0) {
        filtered = filtered.slice(0, limit);
    }

    return filtered;
}

// ============================================================================
// Legacy Compatibility Mappings
// ============================================================================

export const categoryMap = {
    'general': 'genel_kultur',
    'history': 'tarih',
    'sports': 'spor',
} as const;

export const categoryMapReverse = {
    'genel_kultur': 'general',
    'tarih': 'history',
    'spor': 'sports',
} as const;

export const difficultyMap = {
    'easy': 'kolay',
    'medium': 'orta',
    'hard': 'zor',
    'very-hard': 'cok_zor',
} as const;

export const difficultyMapReverse = {
    'kolay': 'easy',
    'orta': 'medium',
    'zor': 'hard',
    'cok_zor': 'very-hard',
} as const;

export type LegacyCategory = 'general' | 'history' | 'sports';
export type LegacyDifficulty = 'easy' | 'medium' | 'hard' | 'very-hard';

export function toLegacyCategory(category: Category): LegacyCategory {
    return categoryMapReverse[category];
}

export function toLegacyDifficulty(difficulty: Difficulty): LegacyDifficulty {
    return difficultyMapReverse[difficulty];
}

export function fromLegacyCategory(category: LegacyCategory): Category {
    return categoryMap[category];
}

export function fromLegacyDifficulty(difficulty: LegacyDifficulty): Difficulty {
    return difficultyMap[difficulty];
}

// Log in dev mode
if (import.meta.env.DEV) {
    console.log(`[QuestionBank] English: ${QUESTION_COUNT_EN} questions, Turkish: ${QUESTION_COUNT_TR} questions`);
}
