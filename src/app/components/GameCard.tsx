import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GameCardProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
  glowing?: boolean;
}

export function GameCard({ 
  children, 
  onClick, 
  icon,
  className = '',
  glowing = false
}: GameCardProps) {
  return (
    <motion.div
      className={`
        relative p-6 rounded-xl cursor-pointer
        bg-gradient-to-br from-[#1a0f2e] to-[#2d1b4e]
        border-2 border-[var(--border)]
        hover:border-[var(--purple)]
        hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
        transition-all duration-300
        ${glowing ? 'shadow-[0_0_40px_rgba(168,85,247,0.6)]' : ''}
        ${className}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon && (
        <div className="mb-4 flex justify-center text-[var(--gold)]">
          {icon}
        </div>
      )}
      <div className="relative z-10">{children}</div>
      
      {/* Spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-gradient-to-b from-[var(--purple)]/20 to-transparent rounded-t-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
