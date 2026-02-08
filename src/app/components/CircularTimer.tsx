import { motion } from 'motion/react';
import { useEffect, useState, useRef, useCallback } from 'react';

interface CircularTimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
  size?: number;
  resetKey?: string | number; // Force reset when this changes
  isLockedRef?: React.RefObject<boolean>; // External lock to prevent firing after answer
}

export function CircularTimer({ duration, onComplete, size = 80, resetKey, isLockedRef }: CircularTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  // Ref to ensure onComplete is only called ONCE per question
  const hasCompletedRef = useRef(false);
  // Stable ref for onComplete to avoid dependency issues
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / duration) * circumference;

  // Handle timer completion - only fires once and respects external lock
  const handleComplete = useCallback(() => {
    // Check external lock FIRST (synchronous check)
    if (isLockedRef?.current) {
      console.log('[CircularTimer] handleComplete BLOCKED - external lock is set');
      return;
    }
    if (hasCompletedRef.current) {
      console.log('[CircularTimer] handleComplete BLOCKED - already completed');
      return;
    }
    hasCompletedRef.current = true;
    setIsRunning(false);
    console.log('[CircularTimer] Timer expired - calling onComplete');
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, [isLockedRef]);

  // Reset on mount and when resetKey or duration changes (new question)
  useEffect(() => {
    console.log('[CircularTimer] Resetting timer - resetKey:', resetKey, 'duration:', duration);
    hasCompletedRef.current = false;
    setTimeLeft(duration);
    setIsRunning(true);
  }, [duration, resetKey]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          handleComplete();
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isRunning, handleComplete]);

  const getColor = () => {
    if (timeLeft <= 5) return 'var(--wrong)';
    if (timeLeft <= 10) return 'var(--gold)';
    return 'var(--neon-green)';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="4"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 10px ${getColor()})`
          }}
          animate={{
            strokeDashoffset: circumference - progress
          }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </svg>

      {/* Time display */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          fontSize: size / 3,
          fontWeight: 700,
          color: getColor()
        }}
      >
        {Math.ceil(timeLeft)}
      </div>
    </div>
  );
}
