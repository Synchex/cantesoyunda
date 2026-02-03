/**
 * @deprecated This file is now a backward-compatibility wrapper.
 * Use questionBank.ts directly for new code.
 * 
 * All types and data are re-exported from questionBank.ts
 */

import {
  questionBank,
  Question,
  Category,
  Difficulty,
  LegacyCategory,
  LegacyDifficulty,
  categoryMapReverse,
  difficultyMapReverse,
  getQuestions as getQuestionsFromBank,
} from './questionBank';

// ============================================================================
// Legacy Type (for backward compatibility)
// ============================================================================

export interface TriviaQuestion {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
  category: LegacyCategory;
  difficulty: LegacyDifficulty;
}

// ============================================================================
// Convert Question Bank questions to legacy format
// ============================================================================

function toLegacyQuestion(q: Question): TriviaQuestion {
  return {
    id: q.id,
    question: q.question,
    answers: q.answers,
    correctAnswer: q.correctAnswer,
    category: categoryMapReverse[q.category],
    difficulty: difficultyMapReverse[q.difficulty],
  };
}

/**
 * @deprecated Use questionBank from questionBank.ts instead
 */
export const triviaQuestions: TriviaQuestion[] = questionBank.map(toLegacyQuestion);

// ============================================================================
// Legacy getQuestions function
// ============================================================================

// Mapping for legacy category names
const legacyCategoryToNew: Record<LegacyCategory | 'all', Category | 'all'> = {
  'general': 'genel_kultur',
  'history': 'tarih',
  'sports': 'spor',
  'all': 'all',
};

// Mapping for legacy difficulty names
const legacyDifficultyToNew: Record<LegacyDifficulty, Difficulty> = {
  'easy': 'kolay',
  'medium': 'orta',
  'hard': 'zor',
  'very-hard': 'cok_zor',
};

/**
 * @deprecated Use getQuestions from questionBank.ts instead
 */
export function getQuestions(
  category: LegacyCategory | 'all',
  difficulty: LegacyDifficulty,
  count: number,
  language: 'tr' | 'en' = 'en'
): TriviaQuestion[] {
  const newCategory = legacyCategoryToNew[category];
  const newDifficulty = legacyDifficultyToNew[difficulty];

  const questions = getQuestionsFromBank({
    category: newCategory,
    difficulty: newDifficulty,
    limit: count,
    shuffle: true,
    language: language,
  });

  return questions.map(toLegacyQuestion);
}

