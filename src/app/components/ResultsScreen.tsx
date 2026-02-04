import { motion } from 'motion/react';
import { GameButton } from './GameButton';
import { Trophy, Star, Target, TrendingUp } from 'lucide-react';
import { Language, getTranslation } from '../data/translations';
import { CreditBar } from './CreditBar';
import { useYuan } from '../context/YuanContext';
import { YuanIcon } from './YuanIcon';
import { formatPrizeFull } from '../data/prizeLadder';

interface ResultsScreenProps {
  totalQuestions: number;
  correctAnswers: number;
  coins: number;
  maxStreak: number;
  onPlayAgain: () => void;
  language: Language;
}

export function ResultsScreen({
  totalQuestions,
  correctAnswers,
  coins,
  maxStreak,
  onPlayAgain,
  language,
}: ResultsScreenProps) {
  const t = (key: any) => getTranslation(language, key);
  const { totalYuan, runYuan } = useYuan();

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getPerformanceMessage = () => {
    if (percentage === 100) return { message: t('perfectScore'), emoji: "🏆", color: "var(--gold)" };
    if (percentage >= 80) return { message: t('excellent'), emoji: "⭐", color: "var(--neon-green)" };
    if (percentage >= 60) return { message: t('greatJob'), emoji: "👏", color: "var(--purple)" };
    if (percentage >= 40) return { message: t('goodEffort'), emoji: "💪", color: "var(--gold)" };
    return { message: t('keepTrying'), emoji: "🎯", color: "var(--muted-foreground)" };
  };

  const performance = getPerformanceMessage();

  const stats = [
    {
      icon: <Target size={32} />,
      label: t('accuracy'),
      value: `${percentage}%`,
      color: 'var(--purple)',
    },
    {
      icon: <Star size={32} />,
      label: t('correctAnswers'),
      value: `${correctAnswers}/${totalQuestions}`,
      color: 'var(--neon-green)',
    },
    {
      icon: <Trophy size={32} />,
      label: t('coinsEarned'),
      value: coins,
      color: 'var(--gold)',
    },
    {
      icon: <TrendingUp size={32} />,
      label: t('bestStreak'),
      value: `${maxStreak}x`,
      color: 'var(--neon-green)',
    },
  ];

  // Yuan stats for display
  const yuanEarnedThisRun = runYuan;
  const totalYuanWallet = totalYuan;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Credit Bar */}
      <CreditBar language={language} />

      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-darker)] to-[var(--bg-dark)]">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--gold)]/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--purple)]/20 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Confetti particles */}
      {percentage >= 60 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: -20,
                backgroundColor: [
                  'var(--gold)',
                  'var(--purple)',
                  'var(--neon-green)',
                ][Math.floor(Math.random() * 3)],
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Main Result */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="text-8xl mb-4"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {performance.emoji}
          </motion.div>

          <h1
            className="text-6xl mb-4"
            style={{
              color: performance.color,
              fontWeight: 800,
              textShadow: `0 0 40px ${performance.color}`,
            }}
          >
            {performance.message}
          </h1>

          <motion.div
            className="text-7xl mb-2"
            style={{ color: 'var(--gold)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {percentage}%
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-2 border-[var(--border)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                borderColor: stat.color,
                boxShadow: `0 0 30px ${stat.color}40`,
              }}
            >
              <div className="flex items-center justify-center mb-2" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="text-center">
                <div className="text-3xl mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--muted-foreground)]">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Yuan Earned Section */}
        <motion.div
          className="mb-8 p-6 rounded-xl border-2"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)',
            borderColor: 'rgba(212, 175, 55, 0.4)',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <YuanIcon size={40} color="#D4AF37" />
              <div>
                <div className="text-sm" style={{ color: 'rgba(236, 236, 236, 0.6)' }}>
                  {language === 'tr' ? 'Bu Turda Kazanilan' : 'Earned This Run'}
                </div>
                <div className="text-3xl font-bold" style={{ color: '#D4AF37', textShadow: '0 0 15px rgba(212, 175, 55, 0.5)' }}>
                  +{formatPrizeFull(yuanEarnedThisRun)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm" style={{ color: 'rgba(236, 236, 236, 0.6)' }}>
                {language === 'tr' ? 'Toplam Yuan' : 'Total Yuan'}
              </div>
              <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
                {formatPrizeFull(totalYuanWallet)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <GameButton
            variant="gold"
            size="lg"
            onClick={onPlayAgain}
            className="w-full"
          >
            {t('playAgain')}
          </GameButton>
        </motion.div>

        {/* Spotlight effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-60 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}