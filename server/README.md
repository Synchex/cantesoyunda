# Trivia Explain API Server

AI-powered explanation service for the trivia game. When a player answers incorrectly, this API provides educational explanations, memory tips, and similar questions.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file and add your OpenAI API key
cp .env.example .env
# Edit .env and set OPENAI_API_KEY

# Start the server
npm start

# Or with auto-reload for development
npm run dev
```

## API Endpoints

### Health Check
```
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Get Explanation
```
POST /api/explain
Content-Type: application/json
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| questionText | string | Yes | The question that was asked |
| choices | string[] | Yes | Array of answer choices |
| correctChoice | string | Yes | The correct answer |
| selectedChoice | string | Yes | The player's wrong answer |
| category | string | No | Question category (default: "general") |
| difficulty | string | No | Difficulty level (default: "medium") |
| language | string | No | "en" or "tr" (default: "en") |

#### Response (Success)

```json
{
  "success": true,
  "explanationMarkdown": "## Why Paris is the Correct Answer\n\nParis has been the capital of France since...",
  "memoryTip": "Remember: The Eiffel Tower is in Paris, and it's the symbol of France's capital!",
  "similarQuestion": "Which city is known as the 'City of Light'? Answer: Paris, due to its role in the Age of Enlightenment.",
  "cached": false
}
```

#### Response (Error)

```json
{
  "success": false,
  "error": "Missing required fields: questionText, choices, correctChoice, selectedChoice",
  "code": "INVALID_REQUEST"
}
```

#### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| INVALID_REQUEST | 400 | Missing or invalid request fields |
| RATE_LIMITED | 429 | Too many requests (10/hour per IP) |
| TIMEOUT | 408 | Request took longer than 30 seconds |
| AI_ERROR | 500/503 | OpenAI API error |
| INTERNAL_ERROR | 500 | Unexpected server error |

## Example curl Requests

### English Request
```bash
curl -X POST http://localhost:3001/api/explain \
  -H "Content-Type: application/json" \
  -d '{
    "questionText": "What is the capital of France?",
    "choices": ["London", "Paris", "Berlin", "Madrid"],
    "correctChoice": "Paris",
    "selectedChoice": "London",
    "category": "geography",
    "difficulty": "easy",
    "language": "en"
  }'
```

### Turkish Request
```bash
curl -X POST http://localhost:3001/api/explain \
  -H "Content-Type: application/json" \
  -d '{
    "questionText": "Fransa'\''nın başkenti neresidir?",
    "choices": ["Londra", "Paris", "Berlin", "Madrid"],
    "correctChoice": "Paris",
    "selectedChoice": "Londra",
    "category": "coğrafya",
    "difficulty": "kolay",
    "language": "tr"
  }'
```

### Health Check
```bash
curl http://localhost:3001/health
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| OPENAI_API_KEY | - | **Required.** Your OpenAI API key |
| PORT | 3001 | Server port |
| OPENAI_MODEL | gpt-4o-mini | Model to use (gpt-4o-mini, gpt-4o, gpt-4-turbo) |
| ALLOWED_ORIGIN | http://localhost:3000 | CORS allowed origin |
| RATE_LIMIT_MAX | 10 | Max requests per hour per IP |

## Security Features

- **Rate Limiting**: 10 requests per hour per IP address
- **Request Timeout**: 30 second maximum
- **Input Sanitization**: All inputs are sanitized to prevent prompt injection
- **Input Length Limits**: Max 500 characters per field
- **No API Key Exposure**: Keys are server-side only

## Cost Estimation

Using `gpt-4o-mini`:
- ~500 input tokens per request
- ~400 output tokens per response
- Cost: ~$0.0003 per explanation
- 10,000 explanations ≈ $3

## Deployment

For production, consider:
1. Use environment variables for all config
2. Set `ALLOWED_ORIGIN` to your production domain
3. Use a process manager like PM2
4. Add logging service (e.g., Datadog, LogRocket)
5. Consider Redis for rate limiting across instances
