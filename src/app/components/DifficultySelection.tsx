import { motion } from 'motion/react';
import { GameCard } from './GameCard';
import { Smile, Zap, Flame, Skull, Layers } from 'lucide-react';
import { Language, getTranslation } from '../data/translations';
import { CreditBar } from './CreditBar';

import { Category } from './CategorySelection';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';

interface DifficultySelectionProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  language: Language;
  category?: Category;
}

export function DifficultySelection({ onSelectDifficulty, language, category }: DifficultySelectionProps) {
  const t = (key: any) => getTranslation(language, key);

  let difficulties = [
    {
      id: 'easy' as Difficulty,
      name: t('easy'),
      icon: <Smile size={64} />,
      description: t('easyDesc'),
      color: 'var(--neon-green)',
    },
    {
      id: 'medium' as Difficulty,
      name: t('medium'),
      icon: <Zap size={64} />,
      description: t('mediumDesc'),
      color: 'var(--gold)',
    },
    {
      id: 'hard' as Difficulty,
      name: t('hard'),
      icon: <Flame size={64} />,
      description: t('hardDesc'),
      color: 'var(--purple)',
    },

    {
      id: 'mixed' as Difficulty,
      name: t('mixed'),
      icon: <Layers size={64} />,
      description: t('mixedDesc'),
      color: '#3B82F6', // Blue like 'All' in categories
      highlighted: true,
    },
  ];

  // Mixed is now available for all categories

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Credit Bar */}
      <CreditBar language={language} />

      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-darker)] to-[var(--bg-dark)]">
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[var(--neon-green)]/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-5xl mb-4"
            style={{
              background: 'linear-gradient(135deg, var(--neon-green) 0%, var(--gold) 50%, var(--wrong) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 700,
            }}
          >
            {t('selectDifficulty')}
          </h2>
          <p className="text-xl text-[var(--muted-foreground)]">
            {t('howBrave')}
          </p>
        </motion.div>

        {/* Difficulty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {difficulties.map((difficulty, index) => (
            <motion.div
              key={difficulty.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GameCard
                onClick={() => onSelectDifficulty(difficulty.id)}
                icon={<div style={{ color: difficulty.color }}>{difficulty.icon}</div>}
                glowing={difficulty.highlighted}
                className="h-full"
              >
                <h3
                  className="text-2xl text-center mb-2"
                  style={{ color: difficulty.color }}
                >
                  {difficulty.name}
                </h3>
                <p className="text-center text-[var(--muted-foreground)]">
                  {difficulty.description}
                </p>
              </GameCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}