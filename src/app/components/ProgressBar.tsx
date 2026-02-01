import { motion } from 'motion/react';
import { Language, getTranslation } from '@/app/data/translations';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  language?: Language;
}

export function ProgressBar({ current, total, showLabel = true, language = 'en' }: ProgressBarProps) {
  const t = (key: any, params?: any) => getTranslation(language, key, params);
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full">
      {showLabel && (
        <div className="text-sm mb-2 text-[var(--muted-foreground)]">
          {t('questionOf', { current, total })}
        </div>
      )}
      <div className="w-full h-2 bg-[var(--bg-darker)] rounded-full overflow-hidden border border-[var(--border)]">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--purple)] via-[var(--gold)] to-[var(--neon-green)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)'
          }}
        />
      </div>
    </div>
  );
}