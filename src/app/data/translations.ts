export type Language = 'en' | 'tr';

export interface Translations {
  // Home Screen
  appTitle: string;
  appSubtitle: string;
  startGame: string;
  
  // Category Selection
  chooseCategory: string;
  selectBattlefield: string;
  generalKnowledge: string;
  generalKnowledgeDesc: string;
  history: string;
  historyDesc: string;
  sports: string;
  sportsDesc: string;
  allCategories: string;
  allCategoriesDesc: string;
  
  // Difficulty Selection
  selectDifficulty: string;
  howBrave: string;
  easy: string;
  easyDesc: string;
  medium: string;
  mediumDesc: string;
  hard: string;
  hardDesc: string;
  veryHard: string;
  veryHardDesc: string;
  
  // Question Screen
  questionOf: string;
  correct: string;
  wrongAnswer: string;
  timeUp: string;
  
  // Results Screen
  perfectScore: string;
  excellent: string;
  greatJob: string;
  goodEffort: string;
  keepTrying: string;
  accuracy: string;
  correctAnswers: string;
  coinsEarned: string;
  bestStreak: string;
  playAgain: string;
  
  // Settings
  settings: string;
  language: string;
  close: string;
  english: string;
  turkish: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Home Screen
    appTitle: 'TRIVIA',
    appSubtitle: 'The Ultimate Quiz Show Experience',
    startGame: 'START GAME',
    
    // Category Selection
    chooseCategory: 'Choose Your Category',
    selectBattlefield: 'Select your battlefield',
    generalKnowledge: 'General Knowledge',
    generalKnowledgeDesc: 'Test your knowledge across all topics',
    history: 'History',
    historyDesc: 'Journey through time and events',
    sports: 'Sports',
    sportsDesc: 'From championships to legendary athletes',
    allCategories: 'All Categories',
    allCategoriesDesc: 'The ultimate challenge: anything goes!',
    
    // Difficulty Selection
    selectDifficulty: 'Select Difficulty',
    howBrave: 'How brave are you feeling?',
    easy: 'Easy',
    easyDesc: 'Warm up with simple questions',
    medium: 'Medium',
    mediumDesc: 'A balanced challenge',
    hard: 'Hard',
    hardDesc: 'For the true trivia masters',
    veryHard: 'Very Hard',
    veryHardDesc: 'Only legends survive this',
    
    // Question Screen
    questionOf: 'Question {current} of {total}',
    correct: '🎉 Correct!',
    wrongAnswer: '❌ Wrong Answer',
    timeUp: "⏰ Time's Up!",
    
    // Results Screen
    perfectScore: 'PERFECT SCORE!',
    excellent: 'EXCELLENT!',
    greatJob: 'GREAT JOB!',
    goodEffort: 'GOOD EFFORT!',
    keepTrying: 'KEEP TRYING!',
    accuracy: 'Accuracy',
    correctAnswers: 'Correct',
    coinsEarned: 'Coins Earned',
    bestStreak: 'Best Streak',
    playAgain: 'PLAY AGAIN',
    
    // Settings
    settings: 'Settings',
    language: 'Language',
    close: 'Close',
    english: 'English',
    turkish: 'Turkish',
  },
  
  tr: {
    // Home Screen
    appTitle: 'BİLGİ YARIŞMASI',
    appSubtitle: 'En İyi Bilgi Yarışması Deneyimi',
    startGame: 'OYUNA BAŞLA',
    
    // Category Selection
    chooseCategory: 'Kategorini Seç',
    selectBattlefield: 'Savaş alanını seç',
    generalKnowledge: 'Genel Kültür',
    generalKnowledgeDesc: 'Tüm konularda bilginizi test edin',
    history: 'Tarih',
    historyDesc: 'Zaman ve olaylar içinde yolculuk',
    sports: 'Spor',
    sportsDesc: 'Şampiyonluklar ve efsanevi sporcular',
    allCategories: 'Tüm Kategoriler',
    allCategoriesDesc: 'Nihai meydan okuma: her şey mümkün!',
    
    // Difficulty Selection
    selectDifficulty: 'Zorluk Seç',
    howBrave: 'Ne kadar cesursun?',
    easy: 'Kolay',
    easyDesc: 'Basit sorularla ısın',
    medium: 'Orta',
    mediumDesc: 'Dengeli bir meydan okuma',
    hard: 'Zor',
    hardDesc: 'Gerçek bilgi yarışması ustaları için',
    veryHard: 'Çok Zor',
    veryHardDesc: 'Sadece efsaneler bunu başarır',
    
    // Question Screen
    questionOf: 'Soru {current} / {total}',
    correct: '🎉 Doğru!',
    wrongAnswer: '❌ Yanlış Cevap',
    timeUp: '⏰ Süre Doldu!',
    
    // Results Screen
    perfectScore: 'MÜKEMMEL SKOR!',
    excellent: 'HARIKA!',
    greatJob: 'ÇOK İYİ!',
    goodEffort: 'İYİ ÇABA!',
    keepTrying: 'DEVAM ET!',
    accuracy: 'Doğruluk',
    correctAnswers: 'Doğru',
    coinsEarned: 'Kazanılan Jeton',
    bestStreak: 'En İyi Seri',
    playAgain: 'TEKRAR OYNA',
    
    // Settings
    settings: 'Ayarlar',
    language: 'Dil',
    close: 'Kapat',
    english: 'İngilizce',
    turkish: 'Türkçe',
  },
};

export function getTranslation(lang: Language, key: keyof Translations, params?: Record<string, string | number>): string {
  let text = translations[lang][key];
  
  if (params) {
    Object.keys(params).forEach(paramKey => {
      text = text.replace(`{${paramKey}}`, String(params[paramKey]));
    });
  }
  
  return text;
}
