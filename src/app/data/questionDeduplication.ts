/**
 * Advanced Question Deduplication Module
 * 
 * This module provides sophisticated duplicate detection including:
 * - Exact duplicate removal
 * - Near-duplicate detection via similarity scoring
 * - Template spam detection (repetitive patterns)
 * - Comprehensive rejection logging
 */

import type { Question } from './questionBank';

// ============================================================================
// Types
// ============================================================================

export type RejectionReason = 'duplicate' | 'near_duplicate' | 'template_spam';

export interface RejectedQuestion {
    question: Question;
    reason: RejectionReason;
    details?: string;
}

export interface DeduplicationStats {
    totalInput: number;
    exactDuplicates: number;
    nearDuplicates: number;
    templateSpam: number;
    finalCount: number;
}

// ============================================================================
// Normalization Functions
// ============================================================================

/**
 * Normalize text for comparison by replacing numbers, years, and cleaning whitespace
 */
export function normalizeText(text: string): string {
    return text
        .toLowerCase()
        // Normalize Turkish characters for better matching
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        // Replace years (4 digit numbers)
        .replace(/\b\d{4}\b/g, 'YEAR')
        // Replace other numbers
        .replace(/\d+/g, 'NUM')
        // Remove punctuation
        .replace(/[.,!?;:'"()]/g, '')
        // Normalize whitespace
        .trim()
        .replace(/\s+/g, ' ');
}

/**
 * Extract question skeleton by replacing named entities and numbers
 * Used for template spam detection
 */
export function extractQuestionSkeleton(questionText: string): string {
    return questionText
        // Replace capitalized names (Turkish and English)
        .replace(/\b[A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜ][a-zçğıöşü]+)*\b/g, 'NAME')
        // Replace years
        .replace(/\b\d{4}\b/g, 'YEAR')
        // Replace numbers
        .replace(/\d+/g, 'NUM')
        // Normalize whitespace
        .trim()
        .replace(/\s+/g, ' ');
}

// ============================================================================
// Similarity Scoring
// ============================================================================

/**
 * Calculate Jaccard similarity between two sets of tokens
 */
function jaccardSimilarity(tokens1: Set<string>, tokens2: Set<string>): number {
    const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
    const union = new Set([...tokens1, ...tokens2]);

    if (union.size === 0) return 0;
    return intersection.size / union.size;
}

/**
 * Tokenize text into words
 */
function tokenize(text: string): Set<string> {
    return new Set(text.toLowerCase().split(/\s+/).filter(t => t.length > 0));
}

/**
 * Calculate similarity score between two questions (0-1)
 * Uses token-based Jaccard similarity
 */
export function calculateSimilarity(q1: Question, q2: Question): number {
    const normalized1 = normalizeText(q1.question);
    const normalized2 = normalizeText(q2.question);

    const tokens1 = tokenize(normalized1);
    const tokens2 = tokenize(normalized2);

    return jaccardSimilarity(tokens1, tokens2);
}

// ============================================================================
// Deduplication Key Generation
// ============================================================================

/**
 * Generate a deduplication key for exact duplicate detection
 */
function getDedupeKey(q: Question): string {
    const normalizedQ = normalizeText(q.question);
    const sortedAnswers = [...q.answers]
        .map(a => normalizeText(a))
        .sort()
        .join('|');
    return `${normalizedQ}::${sortedAnswers}`;
}

// ============================================================================
// Template Spam Detection
// ============================================================================

/**
 * Detect template spam - questions that follow the same pattern
 * Returns questions that should be rejected as spam
 */
export function detectTemplateSpam(questions: Question[], threshold: number = 3): RejectedQuestion[] {
    const skeletonGroups = new Map<string, Question[]>();

    // Group questions by skeleton
    questions.forEach(q => {
        const skeleton = extractQuestionSkeleton(q.question);
        if (!skeletonGroups.has(skeleton)) {
            skeletonGroups.set(skeleton, []);
        }
        skeletonGroups.get(skeleton)!.push(q);
    });

    const rejected: RejectedQuestion[] = [];

    // Flag groups with more than threshold questions
    skeletonGroups.forEach((group, skeleton) => {
        if (group.length > threshold) {
            // Keep the first question, reject the rest
            for (let i = 1; i < group.length; i++) {
                rejected.push({
                    question: group[i],
                    reason: 'template_spam',
                    details: `Skeleton: "${skeleton}" (${group.length} instances)`,
                });
            }
        }
    });

    return rejected;
}

// ============================================================================
// Advanced Deduplication
// ============================================================================

/**
 * Remove duplicates and near-duplicates from question list
 * Returns both the cleaned list and rejection information
 */
export function dedupeQuestionsAdvanced(
    questions: Question[],
    similarityThreshold: number = 0.85
): { cleaned: Question[]; rejected: RejectedQuestion[] } {
    const cleaned: Question[] = [];
    const rejected: RejectedQuestion[] = [];
    const exactDupes = new Map<string, Question>();

    // First pass: remove exact duplicates
    for (const q of questions) {
        const key = getDedupeKey(q);
        if (!exactDupes.has(key)) {
            exactDupes.set(key, q);
        } else {
            rejected.push({
                question: q,
                reason: 'duplicate',
                details: 'Exact duplicate detected',
            });
        }
    }

    const uniqueQuestions = Array.from(exactDupes.values());

    // Second pass: remove near-duplicates
    const processed = new Set<number>();

    for (let i = 0; i < uniqueQuestions.length; i++) {
        if (processed.has(i)) continue;

        cleaned.push(uniqueQuestions[i]);
        processed.add(i);

        // Check for near-duplicates
        for (let j = i + 1; j < uniqueQuestions.length; j++) {
            if (processed.has(j)) continue;

            const similarity = calculateSimilarity(uniqueQuestions[i], uniqueQuestions[j]);

            if (similarity >= similarityThreshold) {
                rejected.push({
                    question: uniqueQuestions[j],
                    reason: 'near_duplicate',
                    details: `${(similarity * 100).toFixed(1)}% similar to question #${uniqueQuestions[i].id}`,
                });
                processed.add(j);
            }
        }
    }

    return { cleaned, rejected };
}

// ============================================================================
// Comprehensive Deduplication Pipeline
// ============================================================================

/**
 * Full deduplication pipeline: removes exact duplicates, near-duplicates, and template spam
 */
export function dedupeQuestionsFull(questions: Question[]): {
    cleaned: Question[];
    stats: DeduplicationStats;
    rejected: RejectedQuestion[];
} {
    const totalInput = questions.length;

    // Step 1: Detect and remove template spam
    const templateSpamRejected = detectTemplateSpam(questions);
    const templateSpamIds = new Set(templateSpamRejected.map(r => r.question.id));
    const afterTemplateFilter = questions.filter(q => !templateSpamIds.has(q.id));

    // Step 2: Remove exact and near duplicates
    const { cleaned, rejected: dupeRejected } = dedupeQuestionsAdvanced(afterTemplateFilter);

    // Combine rejections
    const allRejected = [...templateSpamRejected, ...dupeRejected];

    // Calculate stats
    const exactDuplicates = allRejected.filter(r => r.reason === 'duplicate').length;
    const nearDuplicates = allRejected.filter(r => r.reason === 'near_duplicate').length;
    const templateSpam = allRejected.filter(r => r.reason === 'template_spam').length;

    const stats: DeduplicationStats = {
        totalInput,
        exactDuplicates,
        nearDuplicates,
        templateSpam,
        finalCount: cleaned.length,
    };

    return { cleaned, stats, rejected: allRejected };
}

// ============================================================================
// Logging
// ============================================================================

/**
 * Log rejected question with reason
 */
export function logRejectedQuestion(rejected: RejectedQuestion): void {
    const { question, reason, details } = rejected;
    const reasonText = {
        duplicate: 'Duplicate',
        near_duplicate: 'Near-duplicate',
        template_spam: 'Template spam',
    }[reason];

    console.warn(
        `[Question Rejected] ${reasonText} - ID: ${question.id}`,
        `\n  Question: "${question.question.substring(0, 80)}${question.question.length > 80 ? '...' : ''}"`,
        details ? `\n  ${details}` : ''
    );
}

/**
 * Log deduplication statistics
 */
export function logDeduplicationStats(stats: DeduplicationStats, bankName: string = 'Question Bank'): void {
    const removed = stats.totalInput - stats.finalCount;
    const percentRemoved = ((removed / stats.totalInput) * 100).toFixed(1);

    console.log(`\n[${bankName}] Deduplication Complete`);
    console.log(`  Input:            ${stats.totalInput} questions`);
    console.log(`  Exact duplicates: ${stats.exactDuplicates} removed`);
    console.log(`  Near-duplicates:  ${stats.nearDuplicates} removed`);
    console.log(`  Template spam:    ${stats.templateSpam} removed`);
    console.log(`  ─────────────────────────────────────`);
    console.log(`  Final count:      ${stats.finalCount} questions`);
    console.log(`  Total removed:    ${removed} (${percentRemoved}%)\n`);
}
