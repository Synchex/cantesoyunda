import { Language } from '../data/translations';

// Backend API URL - change this if your server runs on a different port
const API_BASE_URL = 'http://localhost:3001';
const CACHE_PREFIX = 'explain';

export interface ExplainRequest {
    questionId: string;
    questionText: string;
    choices: string[];
    correctChoice: string;
    selectedChoice: string;
    category?: string;
    difficulty?: string;
    language: Language;
}

export interface ExplainResponse {
    success: boolean;
    explanationMarkdown?: string;
    memoryTip?: string;
    similarQuestion?: string;
    cached?: boolean;
    error?: string;
    code?: string;
}

/**
 * Generate cache key for localStorage
 */
function getCacheKey(language: Language, questionId: string): string {
    return `${CACHE_PREFIX}:${language}:${questionId}`;
}

/**
 * Get cached explanation from localStorage
 */
function getCachedExplanation(language: Language, questionId: string): ExplainResponse | null {
    try {
        const key = getCacheKey(language, questionId);
        const cached = localStorage.getItem(key);
        if (cached) {
            const parsed = JSON.parse(cached);
            // Check if cache is valid (has required fields)
            if (parsed.explanationMarkdown && parsed.memoryTip) {
                return { ...parsed, cached: true };
            }
        }
    } catch (error) {
        console.error('Failed to read explanation cache:', error);
    }
    return null;
}

/**
 * Save explanation to localStorage cache
 */
function cacheExplanation(language: Language, questionId: string, response: ExplainResponse): void {
    try {
        const key = getCacheKey(language, questionId);
        localStorage.setItem(key, JSON.stringify({
            explanationMarkdown: response.explanationMarkdown,
            memoryTip: response.memoryTip,
            similarQuestion: response.similarQuestion,
            timestamp: Date.now(),
        }));

        // Clean up old cache entries (keep max 50)
        cleanupCache();
    } catch (error) {
        console.error('Failed to cache explanation:', error);
    }
}

/**
 * Remove old cache entries to prevent storage bloat
 */
function cleanupCache(): void {
    try {
        const keys: { key: string; timestamp: number }[] = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith(CACHE_PREFIX + ':')) {
                const item = localStorage.getItem(key);
                if (item) {
                    const parsed = JSON.parse(item);
                    keys.push({ key, timestamp: parsed.timestamp || 0 });
                }
            }
        }

        // If more than 50 entries, remove oldest
        if (keys.length > 50) {
            keys.sort((a, b) => a.timestamp - b.timestamp);
            const toRemove = keys.slice(0, keys.length - 50);
            toRemove.forEach(({ key }) => localStorage.removeItem(key));
        }
    } catch (error) {
        console.error('Failed to cleanup explanation cache:', error);
    }
}

/**
 * Fetch AI explanation from backend API
 */
export async function fetchExplanation(request: ExplainRequest): Promise<ExplainResponse> {
    // Check cache first
    const cached = getCachedExplanation(request.language, request.questionId);
    if (cached) {
        return cached;
    }

    const url = `${API_BASE_URL}/api/explain`;
    console.log('[ExplainAPI] Fetching from:', url);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionText: request.questionText,
                choices: request.choices,
                correctChoice: request.correctChoice,
                selectedChoice: request.selectedChoice,
                category: request.category || 'general',
                difficulty: request.difficulty || 'medium',
                language: request.language,
            }),
        });

        console.log('[ExplainAPI] Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[ExplainAPI] Error response:', errorText);

            if (response.status === 429) {
                return {
                    success: false,
                    error: request.language === 'tr'
                        ? 'Çok fazla istek. Lütfen daha sonra tekrar deneyin.'
                        : 'Too many requests. Please try again later.',
                    code: 'RATE_LIMITED',
                };
            }

            return {
                success: false,
                error: request.language === 'tr'
                    ? 'Sunucu hatası. Lütfen tekrar deneyin.'
                    : 'Server error. Please try again.',
                code: 'SERVER_ERROR',
            };
        }

        const data: ExplainResponse = await response.json();
        console.log('[ExplainAPI] Success:', data.success);

        if (data.success && data.explanationMarkdown) {
            // Cache successful response
            cacheExplanation(request.language, request.questionId, data);
        }

        return data;
    } catch (error) {
        console.error('[ExplainAPI] Fetch failed:', error);

        // Handle network/connection errors
        if (error instanceof TypeError) {
            return {
                success: false,
                error: request.language === 'tr'
                    ? 'Açıklama sunucusuna bağlanılamadı. Sunucunun çalıştığından emin olun (cd server && npm start).'
                    : 'Cannot connect to explanation server. Make sure it is running (cd server && npm start).',
                code: 'NETWORK_ERROR',
            };
        }

        return {
            success: false,
            error: request.language === 'tr'
                ? 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.'
                : 'An unexpected error occurred. Please try again.',
            code: 'INTERNAL_ERROR',
        };
    }
}

/**
 * Clear all cached explanations
 */
export function clearExplanationCache(): void {
    try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith(CACHE_PREFIX + ':')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
        console.error('Failed to clear explanation cache:', error);
    }
}
