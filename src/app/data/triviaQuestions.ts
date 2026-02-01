export interface TriviaQuestion {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
  category: 'general' | 'history' | 'sports';
  difficulty: 'easy' | 'medium' | 'hard' | 'very-hard';
}

export const triviaQuestions: TriviaQuestion[] = [
  // GENERAL KNOWLEDGE - EASY
  {
    id: 1,
    question: "What is the capital of France?",
    answers: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    category: "general",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "How many continents are there on Earth?",
    answers: ["5", "6", "7", "8"],
    correctAnswer: 2,
    category: "general",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What color is a ruby?",
    answers: ["Blue", "Red", "Green", "Yellow"],
    correctAnswer: 1,
    category: "general",
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Jupiter", "Mars", "Saturn"],
    correctAnswer: 2,
    category: "general",
    difficulty: "easy"
  },

  // GENERAL KNOWLEDGE - MEDIUM
  {
    id: 5,
    question: "What is the largest ocean on Earth?",
    answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    category: "general",
    difficulty: "medium"
  },
  {
    id: 6,
    question: "Which element has the chemical symbol 'O'?",
    answers: ["Osmium", "Oxygen", "Gold", "Silver"],
    correctAnswer: 1,
    category: "general",
    difficulty: "medium"
  },
  {
    id: 7,
    question: "What is the smallest prime number?",
    answers: ["0", "1", "2", "3"],
    correctAnswer: 2,
    category: "general",
    difficulty: "medium"
  },
  {
    id: 8,
    question: "How many sides does a hexagon have?",
    answers: ["5", "6", "7", "8"],
    correctAnswer: 1,
    category: "general",
    difficulty: "medium"
  },

  // GENERAL KNOWLEDGE - HARD
  {
    id: 9,
    question: "What is the speed of light in vacuum?",
    answers: ["299,792 km/s", "150,000 km/s", "400,000 km/s", "250,000 km/s"],
    correctAnswer: 0,
    category: "general",
    difficulty: "hard"
  },
  {
    id: 10,
    question: "Which country has the most UNESCO World Heritage Sites?",
    answers: ["China", "France", "Italy", "Spain"],
    correctAnswer: 2,
    category: "general",
    difficulty: "hard"
  },

  // GENERAL KNOWLEDGE - VERY HARD
  {
    id: 11,
    question: "What is the rarest naturally occurring element on Earth?",
    answers: ["Astatine", "Francium", "Promethium", "Technetium"],
    correctAnswer: 0,
    category: "general",
    difficulty: "very-hard"
  },
  {
    id: 12,
    question: "In what year was the first email sent?",
    answers: ["1965", "1971", "1983", "1990"],
    correctAnswer: 1,
    category: "general",
    difficulty: "very-hard"
  },

  // HISTORY - EASY
  {
    id: 13,
    question: "Who was the first President of the United States?",
    answers: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
    correctAnswer: 1,
    category: "history",
    difficulty: "easy"
  },
  {
    id: 14,
    question: "In which year did World War II end?",
    answers: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
    category: "history",
    difficulty: "easy"
  },
  {
    id: 15,
    question: "Which ancient wonder was located in Egypt?",
    answers: ["Hanging Gardens", "Colossus of Rhodes", "Great Pyramid of Giza", "Lighthouse of Alexandria"],
    correctAnswer: 2,
    category: "history",
    difficulty: "easy"
  },
  {
    id: 16,
    question: "Who painted the Mona Lisa?",
    answers: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
    correctAnswer: 1,
    category: "history",
    difficulty: "easy"
  },

  // HISTORY - MEDIUM
  {
    id: 17,
    question: "The fall of the Berlin Wall occurred in which year?",
    answers: ["1987", "1989", "1991", "1993"],
    correctAnswer: 1,
    category: "history",
    difficulty: "medium"
  },
  {
    id: 18,
    question: "Who was the first woman to win a Nobel Prize?",
    answers: ["Marie Curie", "Mother Teresa", "Jane Addams", "Rosalind Franklin"],
    correctAnswer: 0,
    category: "history",
    difficulty: "medium"
  },
  {
    id: 19,
    question: "The Renaissance began in which country?",
    answers: ["France", "Spain", "Italy", "England"],
    correctAnswer: 2,
    category: "history",
    difficulty: "medium"
  },
  {
    id: 20,
    question: "Which empire was ruled by Julius Caesar?",
    answers: ["Greek Empire", "Roman Empire", "Persian Empire", "Ottoman Empire"],
    correctAnswer: 1,
    category: "history",
    difficulty: "medium"
  },

  // HISTORY - HARD
  {
    id: 21,
    question: "What year did the Byzantine Empire fall?",
    answers: ["1204", "1453", "1492", "1571"],
    correctAnswer: 1,
    category: "history",
    difficulty: "hard"
  },
  {
    id: 22,
    question: "Who was the longest-reigning British monarch before Queen Elizabeth II?",
    answers: ["Queen Victoria", "King George III", "King Henry VIII", "Queen Anne"],
    correctAnswer: 0,
    category: "history",
    difficulty: "hard"
  },

  // HISTORY - VERY HARD
  {
    id: 23,
    question: "The Treaty of Tordesillas was signed between which two countries?",
    answers: ["England and France", "Spain and Portugal", "Spain and Italy", "Portugal and France"],
    correctAnswer: 1,
    category: "history",
    difficulty: "very-hard"
  },
  {
    id: 24,
    question: "What was the name of the first Chinese dynasty?",
    answers: ["Zhou Dynasty", "Shang Dynasty", "Xia Dynasty", "Qin Dynasty"],
    correctAnswer: 2,
    category: "history",
    difficulty: "very-hard"
  },

  // SPORTS - EASY
  {
    id: 25,
    question: "How many players are on a soccer team?",
    answers: ["9", "10", "11", "12"],
    correctAnswer: 2,
    category: "sports",
    difficulty: "easy"
  },
  {
    id: 26,
    question: "Which sport is known as 'The Beautiful Game'?",
    answers: ["Basketball", "Soccer", "Tennis", "Baseball"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "easy"
  },
  {
    id: 27,
    question: "How many points is a touchdown worth in American football?",
    answers: ["3", "6", "7", "8"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "easy"
  },
  {
    id: 28,
    question: "In which sport would you perform a slam dunk?",
    answers: ["Volleyball", "Basketball", "Tennis", "Badminton"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "easy"
  },

  // SPORTS - MEDIUM
  {
    id: 29,
    question: "Which country has won the most FIFA World Cups?",
    answers: ["Germany", "Argentina", "Brazil", "Italy"],
    correctAnswer: 2,
    category: "sports",
    difficulty: "medium"
  },
  {
    id: 30,
    question: "What is the maximum break in snooker?",
    answers: ["137", "147", "157", "167"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "medium"
  },
  {
    id: 31,
    question: "How many Grand Slam tournaments are there in tennis per year?",
    answers: ["3", "4", "5", "6"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "medium"
  },
  {
    id: 32,
    question: "In which year were the first modern Olympic Games held?",
    answers: ["1892", "1896", "1900", "1904"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "medium"
  },

  // SPORTS - HARD
  {
    id: 33,
    question: "Who holds the record for most Olympic gold medals?",
    answers: ["Usain Bolt", "Michael Phelps", "Larisa Latynina", "Paavo Nurmi"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "hard"
  },
  {
    id: 34,
    question: "What is the diameter of a basketball hoop in inches?",
    answers: ["16 inches", "18 inches", "20 inches", "22 inches"],
    correctAnswer: 1,
    category: "sports",
    difficulty: "hard"
  },

  // SPORTS - VERY HARD
  {
    id: 35,
    question: "Who was the first player to score 100 points in a single NBA game?",
    answers: ["Wilt Chamberlain", "Michael Jordan", "Kobe Bryant", "Elgin Baylor"],
    correctAnswer: 0,
    category: "sports",
    difficulty: "very-hard"
  },
  {
    id: 36,
    question: "In what year was the first Cricket World Cup held?",
    answers: ["1971", "1973", "1975", "1977"],
    correctAnswer: 2,
    category: "sports",
    difficulty: "very-hard"
  },
];

export function getQuestions(
  category: 'general' | 'history' | 'sports' | 'all',
  difficulty: 'easy' | 'medium' | 'hard' | 'very-hard',
  count: number
): TriviaQuestion[] {
  let filtered = triviaQuestions;

  // Filter by category
  if (category !== 'all') {
    filtered = filtered.filter(q => q.category === category);
  }

  // Filter by difficulty
  filtered = filtered.filter(q => q.difficulty === difficulty);

  // Shuffle and return requested count
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
