import { motion } from 'motion/react';
import { GameCard } from './GameCard';
import { Brain, Clock, Trophy, Sparkles } from 'lucide-react';
import { Language, getTranslation } from '@/app/data/translations';

export type Category = 'general' | 'history' | 'sports' | 'all';

interface CategorySelectionProps {
  onSelectCategory: (category: Category) => void;
  language: Language;
}

export function CategorySelection({ onSelectCategory, language }: CategorySelectionProps) {
  const t = (key: any) => getTranslation(language, key);

  const categories = [
    {
      id: 'general' as Category,
      name: t('generalKnowledge'),
      icon: <Brain size={64} />,
      description: t('generalKnowledgeDesc'),
    },
    {
      id: 'history' as Category,
      name: t('history'),
      icon: <Clock size={64} />,
      description: t('historyDesc'),
    },
    {
      id: 'sports' as Category,
      name: t('sports'),
      icon: <Trophy size={64} />,
      description: t('sportsDesc'),
    },
    {
      id: 'all' as Category,
      name: t('allCategories'),
      icon: <Sparkles size={64} />,
      description: t('allCategoriesDesc'),
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-darker)] to-[var(--bg-dark)]">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--purple)]/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
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
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--purple-bright) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 700,
            }}
          >
            {t('chooseCategory')}
          </h2>
          <p className="text-xl text-[var(--muted-foreground)]">
            {t('selectBattlefield')}
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GameCard
                onClick={() => onSelectCategory(category.id)}
                icon={category.icon}
                glowing={category.highlighted}
                className="h-full"
              >
                <h3 className="text-2xl text-center mb-2">
                  {category.name}
                </h3>
                <p className="text-center text-[var(--muted-foreground)]">
                  {category.description}
                </p>
              </GameCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}