export const PRIZE_LADDER = [
    { question: 1, prize: 200 },
    { question: 2, prize: 500 },
    { question: 3, prize: 1000 },
    { question: 4, prize: 2500 },
    { question: 5, prize: 5000 },
    { question: 6, prize: 10000 },
    { question: 7, prize: 25000 },
    { question: 8, prize: 50000 },
    { question: 9, prize: 100000 },
    { question: 10, prize: 250000 },
    { question: 11, prize: 500000 },
    { question: 12, prize: 1000000 },
];

export function getPrizeForQuestion(questionNumber: number): number {
    const entry = PRIZE_LADDER.find(item => item.question === questionNumber);
    return entry ? entry.prize : 0;
}

export function getCurrentPrize(currentQuestionIndex: number): number {
    // currentQuestionIndex is 0-based, questions are 1-based
    const questionNumber = currentQuestionIndex + 1;
    return getPrizeForQuestion(questionNumber);
}

export function formatPrize(amount: number): string {
    if (amount >= 1000000) {
        return `${(amount / 1000000).toFixed(1)}M`.replace('.0M', 'M');
    }
    if (amount >= 1000) {
        return `${(amount / 1000).toFixed(0)}K`;
    }
    return amount.toString();
}

export function formatPrizeFull(amount: number): string {
    return amount.toLocaleString('en-US');
}
