import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// DEV: Changed from 500 to 10000 for testing
const INITIAL_CREDITS = 10000;
const DEV_CREDITS = 10000; // Dev override amount
const GAME_COST = 50;
const STORAGE_KEY_CREDITS = 'triviaCredits';
const STORAGE_KEY_RESET_DATE = 'lastCreditReset';

interface CreditContextType {
  credits: number;
  spendCredits: (amount: number) => boolean;
  addCredits: (amount: number) => void;
  canAfford: (amount: number) => boolean;
  resetCredits: () => void; // DEV: Reset credits to 10000 for testing
  timeUntilReset: string;
  gameCost: number;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

function getTimeUntilMidnight(): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function CreditProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState<number>(INITIAL_CREDITS);
  const [timeUntilReset, setTimeUntilReset] = useState<string>(getTimeUntilMidnight());

  // Initialize credits from localStorage and handle daily reset
  useEffect(() => {
    const storedCredits = localStorage.getItem(STORAGE_KEY_CREDITS);
    const lastResetDate = localStorage.getItem(STORAGE_KEY_RESET_DATE);
    const today = getTodayDateString();
    const parsedCredits = storedCredits ? parseInt(storedCredits, 10) : 0;

    // DEV OVERRIDE: If localStorage is missing OR credits are 0, set to DEV_CREDITS for testing
    if (!storedCredits || parsedCredits === 0) {
      setCredits(DEV_CREDITS);
      localStorage.setItem(STORAGE_KEY_CREDITS, String(DEV_CREDITS));
      localStorage.setItem(STORAGE_KEY_RESET_DATE, today);
    } else if (lastResetDate !== today) {
      // New day - reset credits
      setCredits(INITIAL_CREDITS);
      localStorage.setItem(STORAGE_KEY_CREDITS, String(INITIAL_CREDITS));
      localStorage.setItem(STORAGE_KEY_RESET_DATE, today);
    } else {
      // Same day - restore saved credits
      setCredits(parsedCredits);
    }
  }, []);

  // Update countdown timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilReset(getTimeUntilMidnight());
      
      // Check if we've crossed into a new day
      const today = getTodayDateString();
      const lastResetDate = localStorage.getItem(STORAGE_KEY_RESET_DATE);
      
      if (lastResetDate !== today) {
        setCredits(INITIAL_CREDITS);
        localStorage.setItem(STORAGE_KEY_CREDITS, String(INITIAL_CREDITS));
        localStorage.setItem(STORAGE_KEY_RESET_DATE, today);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const spendCredits = (amount: number): boolean => {
    if (credits >= amount) {
      const newCredits = credits - amount;
      setCredits(newCredits);
      localStorage.setItem(STORAGE_KEY_CREDITS, String(newCredits));
      return true;
    }
    return false;
  };

  const addCredits = (amount: number): void => {
    const newCredits = credits + amount;
    setCredits(newCredits);
    localStorage.setItem(STORAGE_KEY_CREDITS, String(newCredits));
  };

  const canAfford = (amount: number): boolean => {
    return credits >= amount;
  };

  // DEV: Reset credits to 10000 for testing
  const resetCredits = (): void => {
    setCredits(DEV_CREDITS);
    localStorage.setItem(STORAGE_KEY_CREDITS, String(DEV_CREDITS));
  };

  return (
    <CreditContext.Provider
      value={{
        credits,
        spendCredits,
        addCredits,
        canAfford,
        resetCredits,
        timeUntilReset,
        gameCost: GAME_COST,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
}
