import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { CategorySelection, Category } from './components/CategorySelection';
import { DifficultySelection, Difficulty } from './components/DifficultySelection';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { LossScreen } from './components/LossScreen';
import { ContinueModal } from './components/ContinueModal';
import { DesignSystem } from './components/DesignSystem';
import { SettingsModal } from './components/SettingsModal';
import { InsufficientCreditsModal } from './components/InsufficientCreditsModal';
import { AIAssistantScreen } from './components/AIAssistantScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { QuestionDatabaseScreen } from './components/QuestionDatabaseScreen';
import { BottomTabBar, TabType } from './components/BottomTabBar';
import { getQuestions } from './data/triviaQuestions';
import { Language } from './data/translations';
import { CreditProvider, useCredits } from './context/CreditContext';
import { toast } from 'sonner';

type GameState = 'home' | 'category' | 'difficulty' | 'playing' | 'results' | 'loss' | 'design-system';
type ViewState = 'game' | 'ai-assistant' | 'leaderboard' | 'database';

function AppContent() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [viewState, setViewState] = useState<ViewState>('game');
  const [activeTab, setActiveTab] = useState<TabType>('home');
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
  const [showInsufficientCreditsModal, setShowInsufficientCreditsModal] = useState(false);
  const { canAfford, spendCredits, gameCost } = useCredits();

  // Loss screen state
  const [lossData, setLossData] = useState<{
    correctAnswer: string;
    userAnswer: string;
    explanation?: string;
  } | null>(null);

  // Continue (ad watch) state
  const [continueUsed, setContinueUsed] = useState(false);
  const [showContinueModal, setShowContinueModal] = useState(false);

  const TOTAL_QUESTIONS = 12;

  const handleStartGame = () => {
    // Check if player has enough credits before proceeding
    if (!canAfford(gameCost)) {
      setShowInsufficientCreditsModal(true);
      return;
    }
    setGameState('category');
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setGameState('difficulty');
  };

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);

    // Deduct credits for starting the game
    const success = spendCredits(gameCost);
    if (!success) {
      setShowInsufficientCreditsModal(true);
      setGameState('home');
      return;
    }

    // Show credit deduction feedback
    toast.success(`-${gameCost} credits`, {
      duration: 2000,
    });

    // Generate questions
    let generatedQuestions = getQuestions(selectedCategory, difficulty, TOTAL_QUESTIONS, language);

    // If we don't have enough questions, try to get more from all categories
    if (generatedQuestions.length < TOTAL_QUESTIONS) {
      // First, try same difficulty across all categories
      const allCategoryQuestions = getQuestions('all', difficulty, TOTAL_QUESTIONS, language);
      if (allCategoryQuestions.length >= TOTAL_QUESTIONS) {
        generatedQuestions = allCategoryQuestions;
      } else {
        // If still not enough, get questions from all difficulties
        const allQuestions = [...generatedQuestions];
        const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'very-hard'];

        for (const diff of difficulties) {
          if (allQuestions.length >= TOTAL_QUESTIONS) break;
          const moreQuestions = getQuestions(selectedCategory === 'all' ? 'all' : selectedCategory, diff, TOTAL_QUESTIONS - allQuestions.length, language);
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
    setContinueUsed(false); // Reset continue usage for new run

    setGameState('playing');
  };

  const handleAnswer = (isCorrect: boolean, wrongAnswerData?: { correctAnswer: string; userAnswer: string; explanation?: string }) => {
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

      // Check if continue has been used already
      if (!continueUsed && wrongAnswerData) {
        // First wrong answer - offer continue option
        setLossData(wrongAnswerData);
        // Don't navigate yet - wait for modal interaction
      } else {
        // Continue already used or no wrong answer data - go to loss screen
        if (wrongAnswerData) {
          setLossData(wrongAnswerData);
        }
      }
    }
  };

  const handleNextQuestion = () => {
    // If there's loss data, navigate to loss screen instead
    if (lossData) {
      setGameState('loss');
      return;
    }

    if (currentQuestionIndex + 1 >= questions.length || currentQuestionIndex + 1 >= TOTAL_QUESTIONS) {
      setGameState('results');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePlayAgain = () => {
    setGameState('home');
    setViewState('game');
    setActiveTab('home');
  };

  const handleTryAgain = () => {
    // Reset game state for new run
    setCurrentQuestionIndex(0);
    setCoins(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectAnswers(0);
    setLossData(null);
    setContinueUsed(false);

    // Go back to difficulty selection to start new game with same category
    setGameState('difficulty');
  };

  const handleGoHome = () => {
    // Reset all state and go to home
    setCurrentQuestionIndex(0);
    setCoins(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectAnswers(0);
    setLossData(null);
    setContinueUsed(false);
    setGameState('home');
    setViewState('game');
    setActiveTab('home');
  };

  const handleWatchAd = () => {
    // Mark continue as used for this run
    setContinueUsed(true);
    setShowContinueModal(false);
    setLossData(null);
    // Player continues with the same question - QuestionScreen will handle restart
  };

  const handleDeclineContinue = () => {
    // Player declined to watch ad - go to loss screen
    setShowContinueModal(false);
    setGameState('loss');
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setViewState('game');
      if (gameState !== 'playing') {
        setGameState('home');
      }
    } else if (tab === 'ai-assistant') {
      setViewState('ai-assistant');
    } else if (tab === 'leaderboard') {
      setViewState('leaderboard');
    } else if (tab === 'database') {
      setViewState('database');
    }
  };

  // Uncomment this line and visit the app to see the design system
  // setGameState('design-system');

  // Show AI Assistant screen
  if (viewState === 'ai-assistant') {
    return (
      <>
        <AIAssistantScreen language={language} />
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} language={language} />
      </>
    );
  }

  // Show Leaderboard screen
  if (viewState === 'leaderboard') {
    return (
      <>
        <LeaderboardScreen language={language} />
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} language={language} />
      </>
    );
  }

  // Show Question Database screen
  if (viewState === 'database') {
    return (
      <>
        <QuestionDatabaseScreen language={language} />
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} language={language} />
      </>
    );
  }

  // Game flow screens (viewState === 'game')

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
        <InsufficientCreditsModal
          isOpen={showInsufficientCreditsModal}
          onClose={() => setShowInsufficientCreditsModal(false)}
          language={language}
        />
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} language={language} />
      </>
    );
  }

  if (gameState === 'category') {
    return (
      <>
        <CategorySelection onSelectCategory={handleSelectCategory} language={language} />
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} language={language} />
      </>
    );
  }

  if (gameState === 'difficulty') {
    return (
      <>
        <DifficultySelection onSelectDifficulty={handleSelectDifficulty} language={language} />
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} language={language} />
      </>
    );
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
      <>
        <QuestionScreen
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={TOTAL_QUESTIONS}
          coins={coins}
          streak={streak}
          onAnswer={handleAnswer}
          onNextQuestion={handleNextQuestion}
          onContinueRequest={() => setShowContinueModal(true)}
          continueUsed={continueUsed}
          language={language}
        />
        <ContinueModal
          isOpen={showContinueModal}
          onWatchAd={handleWatchAd}
          onDecline={handleDeclineContinue}
          language={language}
        />
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} language={language} />
      </>
    );
  }

  if (gameState === 'loss' && lossData) {
    return (
      <>
        <LossScreen
          correctAnswer={lossData.correctAnswer}
          userAnswer={lossData.userAnswer}
          explanation={lossData.explanation}
          correctCount={correctAnswers}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={TOTAL_QUESTIONS}
          coinsEarned={coins}
          onTryAgain={handleTryAgain}
          onGoHome={handleGoHome}
          language={language}
        />
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} language={language} />
      </>
    );
  }

  if (gameState === 'results') {
    return (
      <>
        <ResultsScreen
          totalQuestions={TOTAL_QUESTIONS}
          correctAnswers={correctAnswers}
          coins={coins}
          maxStreak={maxStreak}
          onPlayAgain={handlePlayAgain}
          language={language}
        />
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} language={language} />
      </>
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
      <InsufficientCreditsModal
        isOpen={showInsufficientCreditsModal}
        onClose={() => setShowInsufficientCreditsModal(false)}
        language={language}
      />
      <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} language={language} />
    </>
  );
}

export default function App() {
  return (
    <CreditProvider>
      <AppContent />
    </CreditProvider>
  );
}