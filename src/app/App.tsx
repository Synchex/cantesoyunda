import { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { CategorySelection, Category } from './components/CategorySelection';
import { DifficultySelection, Difficulty } from './components/DifficultySelection';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { LossScreen } from './components/LossScreen';
import { ContinueModal } from './components/ContinueModal';
import { DesignSystem } from './components/DesignSystem';
import { SettingsScreen } from './components/SettingsScreen';
import { InsufficientCreditsModal } from './components/InsufficientCreditsModal';
import { GameHistoryScreen } from './components/GameHistoryScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { QuestionDatabaseScreen } from './components/QuestionDatabaseScreen';
import { BottomTabBar, TabType } from './components/BottomTabBar';
import { SportsSubcategoryScreen, SportsSubcategory } from './components/SportsSubcategoryScreen';
import { HistorySubcategoryScreen, HistorySubcategory } from './components/HistorySubcategoryScreen';
import { getQuestions, HistorySubcategory as HistorySubcategoryEN, HistorySubcategoryTR } from './data/triviaQuestions';
import { Language } from './data/translations';
import { CreditProvider, useCredits } from './context/CreditContext';
import { GameHistoryProvider, useGameHistory } from './context/GameHistoryContext';
import { YuanProvider, useYuan } from './context/YuanContext';
import { getCurrentPrize } from './data/prizeLadder';
import { toast } from 'sonner';

type GameState = 'home' | 'category' | 'sports-subcategory' | 'history-subcategory' | 'difficulty' | 'playing' | 'results' | 'loss' | 'design-system';
type ViewState = 'game' | 'game-history' | 'leaderboard' | 'database' | 'settings';

function AppContent() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [viewState, setViewState] = useState<ViewState>('game');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedSportsSubcategory, setSelectedSportsSubcategory] = useState<SportsSubcategory | null>(null);
  const [selectedHistorySubcategory, setSelectedHistorySubcategory] = useState<HistorySubcategory | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [language, setLanguage] = useState<Language>('en');
  const [showInsufficientCreditsModal, setShowInsufficientCreditsModal] = useState(false);
  const { canAfford, spendCredits, gameCost } = useCredits();
  const { startNewRun, recordAnswer, finalizeRun } = useGameHistory();
  const { addYuan, resetRunYuan } = useYuan();

  // Loss screen state - FROZEN SNAPSHOT to prevent data mismatch
  const [lossData, setLossData] = useState<{
    // Question context (frozen at answer time)
    questionId: number;
    questionText: string;
    answers: string[];
    correctAnswerIndex: number;
    // Answer data
    correctAnswer: string;
    userAnswer: string;
    userAnswerIndex: number | null; // null if time up
    timeUp: boolean;
    explanation?: string;
    // Metadata
    category: string;
    difficulty: string;
    timestamp: number;
  } | null>(null);

  // Continue (ad watch) state
  const [continueUsed, setContinueUsed] = useState(false);
  const [showContinueModal, setShowContinueModal] = useState(false);

  const TOTAL_QUESTIONS = 12;

  // Finalize run when game completes successfully
  useEffect(() => {
    if (gameState === 'results') {
      // Won full prize for completing all questions
      const prize = getCurrentPrize(TOTAL_QUESTIONS - 1); // Get prize for last question
      finalizeRun('completed', prize);
    }
  }, [gameState, finalizeRun]);

  // Finalize run when game is lost
  useEffect(() => {
    if (gameState === 'loss') {
      // Get prize for last correctly answered question (current index - 1 if wrong, but we track 0 for loss)
      // Since they lost, prize is 0 unless we implement checkpoints
      finalizeRun('lost', 0);
    }
  }, [gameState, finalizeRun]);

  const handleStartGame = () => {
    // Check if player has enough credits before proceeding
    if (!canAfford(gameCost)) {
      setShowInsufficientCreditsModal(true);
      return;
    }
    setGameState('category');
  };

  const handleSelectCategory = (category: Category) => {
    console.log('[DEBUG] handleSelectCategory called with:', category);
    setSelectedCategory(category);
    // If Sports is selected, show subcategory selection first
    if (category === 'sports') {
      console.log('[DEBUG] Sports selected, navigating to sports-subcategory');
      setGameState('sports-subcategory');
    } else if (category === 'history') {
      // History subcategory for both EN and TR (different subcategories per language)
      console.log('[DEBUG] History selected, navigating to history-subcategory');
      setGameState('history-subcategory');
    } else {
      setSelectedSportsSubcategory(null); // Clear any previous subcategory
      setSelectedHistorySubcategory(null);
      setGameState('difficulty');
    }
  };

  const handleSelectSportsSubcategory = (subcategory: SportsSubcategory) => {
    setSelectedSportsSubcategory(subcategory);
    setGameState('difficulty');
  };

  const handleSelectHistorySubcategory = (subcategory: HistorySubcategory) => {
    setSelectedHistorySubcategory(subcategory);
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

    // Generate questions (pass subcategory/historySubcategory based on category and language)
    // For history: EN uses historySubcategory, TR uses historySubcategoryTR (passed as 7th param)
    // Cast to the appropriate types from questionBank
    const historySubEN = selectedCategory === 'history' && language === 'en'
      ? selectedHistorySubcategory as HistorySubcategoryEN | undefined
      : undefined;
    const historySubTR = selectedCategory === 'history' && language === 'tr'
      ? selectedHistorySubcategory as unknown as HistorySubcategoryTR | undefined
      : undefined;
    let generatedQuestions = getQuestions(
      selectedCategory,
      difficulty,
      TOTAL_QUESTIONS,
      language,
      selectedCategory === 'sports' ? selectedSportsSubcategory || undefined : undefined,
      historySubEN,
      historySubTR
    );

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
    resetRunYuan(); // Reset yuan earned this run

    // Start tracking this run
    startNewRun(selectedCategory, difficulty, TOTAL_QUESTIONS);

    setGameState('playing');
  };

  const handleAnswer = (isCorrect: boolean, snapshot?: {
    questionId: number;
    questionText: string;
    answers: string[];
    correctAnswerIndex: number;
    correctAnswer: string;
    userAnswer: string;
    userAnswerIndex: number | null;
    timeUp: boolean;
    explanation?: string;
    category: string;
    difficulty: string;
    timestamp: number;
  }) => {
    // Record this answer in history (use snapshot data if available)
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      recordAnswer({
        questionId: snapshot?.questionId?.toString() || String(currentQuestion.id),
        questionIndex: currentQuestionIndex,
        questionText: snapshot?.questionText || currentQuestion.question,
        selectedIndex: snapshot?.userAnswerIndex ?? (isCorrect ? 0 : -1),
        correctIndex: snapshot?.correctAnswerIndex ?? 0,
        isCorrect,
        userAnswer: snapshot?.userAnswer || (isCorrect ? 'Correct' : 'N/A'),
        correctAnswer: snapshot?.correctAnswer || 'N/A',
      });
    }

    if (isCorrect) {
      // CRITICAL: Clear any stale lossData from previous wrong answer
      // This prevents showing old loss screen after correct answer
      console.log('[App] Clearing lossData on correct answer');
      setLossData(null);

      const newStreak = streak + 1;
      const multiplier = Math.min(Math.floor(newStreak / 3) + 1, 5);
      const earnedCoins = 100 * multiplier;

      const prizeAmount = getCurrentPrize(currentQuestionIndex);
      addYuan(prizeAmount);

      setCorrectAnswers(prev => prev + 1);
      setCoins(prev => prev + earnedCoins);
      setStreak(newStreak);
      setMaxStreak(prev => Math.max(prev, newStreak));
    } else {
      setStreak(0);

      // Store FROZEN SNAPSHOT directly - no mutation possible
      if (snapshot) {
        // INVARIANT CHECK: Verify correctAnswer exists in answers
        if (!snapshot.answers.includes(snapshot.correctAnswer)) {
          console.error('[App] INVARIANT VIOLATION: correctAnswer not in answers!', {
            snapshot,
            currentQuestionIndex,
            currentQuestionId: currentQuestion?.id,
          });
        }

        console.log('[App] Storing snapshot for loss screen:', snapshot);
        setLossData(snapshot);
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
    setSelectedSportsSubcategory(null);
    setGameState('home');
    setViewState('game');
    setActiveTab('home');
  };

  const handleWithdraw = (cashOutAmount: number) => {
    console.log('[App] handleWithdraw called with cashOutAmount:', cashOutAmount);

    // DEV invariant check
    if (import.meta.env.DEV) {
      if (cashOutAmount < 0) {
        console.error('[App] INVARIANT VIOLATION: cashOutAmount < 0', { cashOutAmount });
      }
    }

    // 1. Add cashed out YUAN to balance
    if (cashOutAmount > 0) {
      addYuan(cashOutAmount);
    }

    // 2. Finalize run as 'withdrawn' with prize
    finalizeRun('withdrawn', cashOutAmount);

    // 3. Reset game state
    setCurrentQuestionIndex(0);
    setCoins(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectAnswers(0);
    setLossData(null);
    setContinueUsed(false);
    setSelectedSportsSubcategory(null);

    // 4. Navigate to home
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
    } else if (tab === 'game-history') {
      setViewState('game-history');
    } else if (tab === 'leaderboard') {
      setViewState('leaderboard');
    } else if (tab === 'database') {
      setViewState('database');
    } else if (tab === 'settings') {
      setViewState('settings');
    }
  };

  // Uncomment this line and visit the app to see the design system
  // setGameState('design-system');

  // Show Game History screen
  if (viewState === 'game-history') {
    return (
      <>
        <GameHistoryScreen language={language} />
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

  // Show Settings screen
  if (viewState === 'settings') {
    return (
      <>
        <SettingsScreen
          language={language}
          onLanguageChange={setLanguage}
        />
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
          language={language}
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

  if (gameState === 'sports-subcategory') {
    console.log('[DEBUG] Rendering SportsSubcategoryScreen');
    return (
      <>
        <SportsSubcategoryScreen
          onSelectSubcategory={handleSelectSportsSubcategory}
          language={language}
        />
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} language={language} />
      </>
    );
  }

  if (gameState === 'history-subcategory') {
    console.log('[DEBUG] Rendering HistorySubcategoryScreen');
    return (
      <>
        <HistorySubcategoryScreen
          onSelectSubcategory={handleSelectHistorySubcategory}
          language={language}
        />
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} language={language} />
      </>
    );
  }

  if (gameState === 'difficulty') {
    return (
      <>
        <DifficultySelection
          onSelectDifficulty={handleSelectDifficulty}
          language={language}
          category={selectedCategory}
        />
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
            language={language}
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
          onWithdraw={handleWithdraw}
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
    // CRITICAL: All data comes from frozen snapshot - NOT from currentQuestion
    // This prevents stale data or index mismatch bugs
    console.log('[App] Rendering LossScreen with frozen snapshot:', lossData);
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
          prizeWon={0}
          onTryAgain={handleTryAgain}
          onGoHome={handleGoHome}
          language={language}
          questionId={lossData.questionId.toString()}
          questionText={lossData.questionText}
          choices={lossData.answers}
          category={lossData.category}
          difficulty={lossData.difficulty}
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
        language={language}
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
      <YuanProvider>
        <GameHistoryProvider>
          <AppContent />
        </GameHistoryProvider>
      </YuanProvider>
    </CreditProvider>
  );
}