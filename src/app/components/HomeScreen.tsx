import { motion } from 'motion/react';
import { GameButton } from './GameButton';
import { Sparkles, Settings } from 'lucide-react';
import { Language, getTranslation } from '@/app/data/translations';

interface HomeScreenProps {
  onStartGame: () => void;
  onOpenSettings: () => void;
  language: Language;
}

export function HomeScreen({ onStartGame, onOpenSettings, language }: HomeScreenProps) {
  const t = (key: any) => getTranslation(language, key);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Settings button */}
      <motion.button
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-[var(--card)] border-2 border-[var(--border)] hover:border-[var(--purple)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        onClick={onOpenSettings}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <Settings size={24} className="text-[var(--muted-foreground)]" />
      </motion.button>

      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-darker)] to-[var(--bg-dark)]">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--purple)]/20 rounded-full blur-[120px]"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-[120px]"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Title with dramatic effect */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <h1 
            className="text-6xl md:text-7xl mb-4 leading-tight"
            style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--purple-bright) 50%, var(--neon-green) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 800,
              textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
            }}
          >
            {t('appTitle')}
          </h1>
          <motion.div
            className="flex items-center justify-center gap-2 text-xl md:text-2xl text-[var(--muted-foreground)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Sparkles className="text-[var(--gold)]" size={24} />
            <span>{t('appSubtitle')}</span>
            <Sparkles className="text-[var(--gold)]" size={24} />
          </motion.div>
        </motion.div>

        {/* Spotlight effect on title */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        {/* Giant Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          className="mt-16"
        >
          <GameButton 
            variant="gold" 
            size="xl" 
            onClick={onStartGame}
            className="text-3xl px-16 py-8 shadow-[0_0_60px_rgba(255,215,0,0.6)]"
          >
            {t('startGame')}
          </GameButton>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--gold)] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}