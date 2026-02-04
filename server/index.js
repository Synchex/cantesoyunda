import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Check if we're in mock mode (no API key)
const MOCK_MODE = !process.env.OPENAI_API_KEY;

let openai = null;
if (!MOCK_MODE) {
    const OpenAI = (await import('openai')).default;
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
}

// ============================================
// MIDDLEWARE
// ============================================

// CORS - Allow all origins in development
app.use(cors({
    origin: true, // Allow all origins
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

// JSON body parser
app.use(express.json({ limit: '10kb' }));

// Rate limiter - 100 requests per hour per IP (more lenient for testing)
const explainLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    message: {
        success: false,
        error: 'Too many explanation requests. Please try again later.',
        code: 'RATE_LIMITED',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// ============================================
// MOCK RESPONSES
// ============================================

function getMockResponse(language, questionText, correctChoice, selectedChoice) {
    const isEnglish = language !== 'tr';

    if (isEnglish) {
        return {
            explanationMarkdown: `## Why "${correctChoice}" is Correct

The correct answer is **${correctChoice}**. This is an important fact to remember!

You selected "${selectedChoice}", which is a common misconception. Many people make this mistake, so don't worry - learning from errors is how we improve.

**Key Point:** Understanding why an answer is correct helps reinforce the knowledge in your memory. Keep practicing and you'll master these questions!`,

            memoryTip: `Remember: Think of "${correctChoice}" as the key fact here. Create a mental image or association to help it stick!`,

            similarQuestion: `A related question you might see: "Can you name another fact related to ${correctChoice}?" This helps reinforce your learning through connected knowledge.`,
        };
    } else {
        return {
            explanationMarkdown: `## Neden "${correctChoice}" Doğru?

Doğru cevap **${correctChoice}**. Bu hatırlanması gereken önemli bir bilgidir!

Sen "${selectedChoice}" seçtiniz, bu yaygın bir yanlış anlamadır. Birçok kişi bu hatayı yapar, endişelenmeyin - hatalardan öğrenmek gelişmenin yoludur.

**Önemli Nokta:** Bir cevabın neden doğru olduğunu anlamak, bilgiyi hafızanızda pekiştirmeye yardımcı olur. Pratik yapmaya devam edin!`,

            memoryTip: `Unutmayın: "${correctChoice}" buradaki anahtar bilgidir. Aklınızda kalması için bir görsel veya çağrışım oluşturun!`,

            similarQuestion: `Görebileceğiniz benzer bir soru: "${correctChoice}" ile ilgili başka bir bilgi söyleyebilir misiniz? Bu, bağlantılı bilgi yoluyla öğrenmenizi pekiştirir.`,
        };
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/[<>]/g, '')
        .trim()
        .slice(0, 500);
}

function buildPrompt({ questionText, choices, correctChoice, selectedChoice, category, difficulty, language }) {
    const lang = language === 'tr' ? 'Turkish' : 'English';

    return `You are an educational assistant for a trivia game. A player answered a question incorrectly. Provide a helpful, encouraging explanation.

QUESTION: ${questionText}

CHOICES:
${choices.map((c, i) => `${i + 1}. ${c}`).join('\n')}

CORRECT ANSWER: ${correctChoice}
PLAYER'S ANSWER: ${selectedChoice}
CATEGORY: ${category}
DIFFICULTY: ${difficulty}

Respond in ${lang} with a JSON object containing exactly these three fields:
1. "explanationMarkdown": A clear, educational explanation (2-4 paragraphs) of why the correct answer is right. Use markdown formatting. Be encouraging but informative.
2. "memoryTip": A single memorable tip or mnemonic to help remember this fact (1-2 sentences).
3. "similarQuestion": A related follow-up question they might encounter, with the answer revealed (1-2 sentences).

Respond ONLY with valid JSON, no additional text.`;
}

function parseAIResponse(content) {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('No JSON found in AI response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    if (!parsed.explanationMarkdown || !parsed.memoryTip || !parsed.similarQuestion) {
        throw new Error('Missing required fields in AI response');
    }

    return {
        explanationMarkdown: String(parsed.explanationMarkdown),
        memoryTip: String(parsed.memoryTip),
        similarQuestion: String(parsed.similarQuestion),
    };
}

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        mode: MOCK_MODE ? 'mock' : 'live',
        timestamp: new Date().toISOString()
    });
});

// Main explain endpoint
app.post('/api/explain',
    explainLimiter,
    async (req, res) => {
        try {
            const { questionText, choices, correctChoice, selectedChoice, category, difficulty, language } = req.body;

            // Required field validation
            if (!questionText || !choices || !correctChoice || !selectedChoice) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields: questionText, choices, correctChoice, selectedChoice',
                    code: 'INVALID_REQUEST',
                });
            }

            if (!Array.isArray(choices) || choices.length < 2) {
                return res.status(400).json({
                    success: false,
                    error: 'choices must be an array with at least 2 options',
                    code: 'INVALID_REQUEST',
                });
            }

            const validLanguages = ['en', 'tr'];
            const lang = validLanguages.includes(language) ? language : 'en';

            // Sanitize inputs
            const sanitized = {
                questionText: sanitizeInput(questionText),
                choices: choices.map(c => sanitizeInput(c)),
                correctChoice: sanitizeInput(correctChoice),
                selectedChoice: sanitizeInput(selectedChoice),
                category: sanitizeInput(category || 'general'),
                difficulty: sanitizeInput(difficulty || 'medium'),
                language: lang,
            };

            // MOCK MODE: Return fake response
            if (MOCK_MODE) {
                console.log('[MOCK] Generating fake explanation...');

                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));

                const mockResult = getMockResponse(
                    lang,
                    sanitized.questionText,
                    sanitized.correctChoice,
                    sanitized.selectedChoice
                );

                return res.json({
                    success: true,
                    ...mockResult,
                    cached: false,
                    mock: true,
                });
            }

            // LIVE MODE: Call OpenAI
            const prompt = buildPrompt(sanitized);

            const completion = await openai.chat.completions.create({
                model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an educational assistant. Always respond with valid JSON only.',
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                temperature: 0.7,
                max_tokens: 1000,
            });

            const content = completion.choices[0]?.message?.content;
            if (!content) {
                throw new Error('Empty response from AI');
            }

            const result = parseAIResponse(content);

            res.json({
                success: true,
                ...result,
                cached: false,
            });

        } catch (error) {
            console.error('Explain API Error:', error);

            if (error.code === 'insufficient_quota') {
                return res.status(503).json({
                    success: false,
                    error: 'AI service temporarily unavailable. Please try again later.',
                    code: 'AI_ERROR',
                });
            }

            if (error.code === 'rate_limit_exceeded') {
                return res.status(429).json({
                    success: false,
                    error: 'AI service rate limit exceeded. Please try again later.',
                    code: 'RATE_LIMITED',
                });
            }

            res.status(500).json({
                success: false,
                error: 'An unexpected error occurred. Please try again.',
                code: 'INTERNAL_ERROR',
            });
        }
    }
);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        code: 'NOT_FOUND',
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
    });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════╗
║   Trivia Explain API Server                    ║
╠════════════════════════════════════════════════╣
║   Status: Running                              ║
║   Port: ${PORT}                                   ║
║   Mode: ${MOCK_MODE ? 'MOCK (no API key)' : 'LIVE (OpenAI)'}             ║
╚════════════════════════════════════════════════╝
${MOCK_MODE ? `
⚠️  Running in MOCK MODE - returning fake responses
    To use real AI, add OPENAI_API_KEY to .env
` : ''}
Endpoints:
  GET  /health       - Health check
  POST /api/explain  - Get AI explanation for wrong answer
    `);
});

export default app;
