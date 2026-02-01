import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { CategorySelection, Category } from './components/CategorySelection';
import { DifficultySelection, Difficulty } from './components/DifficultySelection';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { DesignSystem } from './components/DesignSystem';
import { SettingsModal } from './components/SettingsModal';
import { getQuestions } from './data/triviaQuestions';
import { Language } from './data/translations';

type GameState = 'home' | 'category' | 'difficulty' | 'playing' | 'results' | 'design-system';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [language, setLanguage] = useState<Language>('en');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const TOTAL_QUESTIONS = 12;

  const handleStartGame = () => {
    setGameState('category');
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setGameState('difficulty');
  };

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    
    // Generate questions
    let generatedQuestions = getQuestions(selectedCategory, difficulty, TOTAL_QUESTIONS);
    
    // If we don't have enough questions, try to get more from all categories
    if (generatedQuestions.length < TOTAL_QUESTIONS) {
      // First, try same difficulty across all categories
      const allCategoryQuestions = getQuestions('all', difficulty, TOTAL_QUESTIONS);
      if (allCategoryQuestions.length >= TOTAL_QUESTIONS) {
        generatedQuestions = allCategoryQuestions;
      } else {
        // If still not enough, get questions from all difficulties
        const allQuestions = [...generatedQuestions];
        const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'very-hard'];
        
        for (const diff of difficulties) {
          if (allQuestions.length >= TOTAL_QUESTIONS) break;
          const moreQuestions = getQuestions(selectedCategory === 'all' ? 'all' : selectedCategory, diff, TOTAL_QUESTIONS - allQuestions.length);
          allQuestions.push(...moreQuestions.filter(q => !allQuestions.find(aq => aq.id === q.id)));
        }
        
        generatedQuestions = allQuestions.slice(0, TOTAL_QUESTIONS);
      }
    }
    
    setQuestions(generatedQuestions);
    
    // Reset game stats
    setCurrentQuestionIndex(0);
    setCoins(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectAnswers(0);
    
    setGameState('playing');
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      const newStreak = streak + 1;
      const multiplier = Math.min(Math.floor(newStreak / 3) + 1, 5); // Max 5x multiplier
      const earnedCoins = 100 * multiplier;
      
      setCorrectAnswers(prev => prev + 1);
      setCoins(prev => prev + earnedCoins);
      setStreak(newStreak);
      setMaxStreak(prev => Math.max(prev, newStreak));
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 >= questions.length || currentQuestionIndex + 1 >= TOTAL_QUESTIONS) {
      setGameState('results');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePlayAgain = () => {
    setGameState('home');
  };

  // Uncomment this line and visit the app to see the design system
  // setGameState('design-system');

  if (gameState === 'design-system') {
    return <DesignSystem />;
  }

  if (gameState === 'home') {
    return (
      <>
        <HomeScreen 
          onStartGame={handleStartGame} 
          onOpenSettings={() => setIsSettingsOpen(true)}
          language={language}
        />
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          currentLanguage={language}
          onLanguageChange={setLanguage}
        />
      </>
    );
  }

  if (gameState === 'category') {
    return <CategorySelection onSelectCategory={handleSelectCategory} language={language} />;
  }

  if (gameState === 'difficulty') {
    return <DifficultySelection onSelectDifficulty={handleSelectDifficulty} language={language} />;
  }

  if (gameState === 'playing' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Safety check - if question doesn't exist, go back to home
    if (!currentQuestion) {
      return (
        <>
          <HomeScreen 
            onStartGame={handleStartGame} 
            onOpenSettings={() => setIsSettingsOpen(true)}
            language={language}
          />
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
        </>
      );
    }
    
    return (
      <QuestionScreen
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={TOTAL_QUESTIONS}
        coins={coins}
        streak={streak}
        onAnswer={handleAnswer}
        onNextQuestion={handleNextQuestion}
        language={language}
      />
    );
  }

  if (gameState === 'results') {
    return (
      <ResultsScreen
        totalQuestions={TOTAL_QUESTIONS}
        correctAnswers={correctAnswers}
        coins={coins}
        maxStreak={maxStreak}
        onPlayAgain={handlePlayAgain}
        language={language}
      />
    );
  }

  return (
    <>
      <HomeScreen 
        onStartGame={handleStartGame} 
        onOpenSettings={() => setIsSettingsOpen(true)}
        language={language}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />
    </>
  );
}