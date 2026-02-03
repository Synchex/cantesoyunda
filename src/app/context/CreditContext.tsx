import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const INITIAL_CREDITS = 500;
const GAME_COST = 50;
const STORAGE_KEY_CREDITS = 'triviaCredits';
const STORAGE_KEY_RESET_DATE = 'lastCreditReset';

interface CreditContextType {
  credits: number;
  spendCredits: (amount: number) => boolean;
  addCredits: (amount: number) => void;
  canAfford: (amount: number) => boolean;
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

    if (lastResetDate !== today) {
      // New day - reset credits
      setCredits(INITIAL_CREDITS);
      localStorage.setItem(STORAGE_KEY_CREDITS, String(INITIAL_CREDITS));
      localStorage.setItem(STORAGE_KEY_RESET_DATE, today);
    } else if (storedCredits) {
      // Same day - restore saved credits
      setCredits(parseInt(storedCredits, 10));
    } else {
      // First time - initialize
      localStorage.setItem(STORAGE_KEY_CREDITS, String(INITIAL_CREDITS));
      localStorage.setItem(STORAGE_KEY_RESET_DATE, today);
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

  return (
    <CreditContext.Provider
      value={{
        credits,
        spendCredits,
        addCredits,
        canAfford,
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
