import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GameButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gold' | 'answer';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  className?: string;
}

export function GameButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = ''
}: GameButtonProps) {
  const baseClasses = "relative overflow-hidden transition-all duration-300 cursor-pointer";
  
  const variantClasses = {
    primary: "bg-gradient-to-br from-[var(--purple)] to-[var(--purple-bright)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] border-2 border-[var(--purple-bright)]",
    secondary: "bg-gradient-to-br from-[#2d1b4e] to-[#1a0f2e] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] border-2 border-[var(--border)]",
    gold: "bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] border-2 border-[var(--gold)] text-[var(--bg-dark)]",
    answer: "bg-gradient-to-br from-[#1a0f2e] to-[#2d1b4e] hover:bg-gradient-to-br hover:from-[#2d1b4e] hover:to-[#3d2b5e] border-2 border-[var(--border)] hover:border-[var(--purple)]"
  };
  
  const sizeClasses = {
    sm: "px-6 py-2 rounded-full text-sm",
    md: "px-8 py-3 rounded-full text-base",
    lg: "px-10 py-4 rounded-full text-lg",
    xl: "px-12 py-6 rounded-2xl text-2xl"
  };
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      disabled={disabled}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.button>
  );
}
