import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const STORAGE_KEY_YUAN = 'totalYuan';

interface YuanContextType {
  totalYuan: number;
  runYuan: number;
  addYuan: (amount: number) => void;
  resetRunYuan: () => void;
  resetYuan: () => void; // DEV: Reset total yuan to 0
}

const YuanContext = createContext<YuanContextType | undefined>(undefined);

export function YuanProvider({ children }: { children: ReactNode }) {
  const [totalYuan, setTotalYuan] = useState<number>(0);
  const [runYuan, setRunYuan] = useState<number>(0);

  // Initialize totalYuan from localStorage
  useEffect(() => {
    const storedYuan = localStorage.getItem(STORAGE_KEY_YUAN);
    if (storedYuan) {
      setTotalYuan(parseInt(storedYuan, 10));
    }
  }, []);

  const addYuan = (amount: number): void => {
    const newTotal = totalYuan + amount;
    setTotalYuan(newTotal);
    setRunYuan(prev => prev + amount);
    localStorage.setItem(STORAGE_KEY_YUAN, String(newTotal));
  };

  const resetRunYuan = (): void => {
    setRunYuan(0);
  };

  // DEV: Reset total yuan to 0
  const resetYuan = (): void => {
    setTotalYuan(0);
    setRunYuan(0);
    localStorage.setItem(STORAGE_KEY_YUAN, '0');
  };

  return (
    <YuanContext.Provider
      value={{
        totalYuan,
        runYuan,
        addYuan,
        resetRunYuan,
        resetYuan,
      }}
    >
      {children}
    </YuanContext.Provider>
  );
}

export function useYuan() {
  const context = useContext(YuanContext);
  if (context === undefined) {
    throw new Error('useYuan must be used within a YuanProvider');
  }
  return context;
}
