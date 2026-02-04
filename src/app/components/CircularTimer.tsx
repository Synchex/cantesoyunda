import { motion } from 'motion/react';
import { useEffect, useState, useRef, useCallback } from 'react';

interface CircularTimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
  size?: number;
}

export function CircularTimer({ duration, onComplete, size = 80 }: CircularTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  // Ref to ensure onComplete is only called ONCE
  const hasCompletedRef = useRef(false);
  // Stable ref for onComplete to avoid dependency issues
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / duration) * circumference;

  // Handle timer completion - only fires once
  const handleComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setIsRunning(false);
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, []);

  useEffect(() => {
    // Reset on duration change (new question)
    hasCompletedRef.current = false;
    setTimeLeft(duration);
    setIsRunning(true);
  }, [duration]);

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
