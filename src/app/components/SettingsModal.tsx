import { motion, AnimatePresence } from 'motion/react';
import { X, Globe } from 'lucide-react';
import { GameButton } from './GameButton';
import { Language, getTranslation } from '@/app/data/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function SettingsModal({ isOpen, onClose, currentLanguage, onLanguageChange }: SettingsModalProps) {
  const t = (key: any) => getTranslation(currentLanguage, key);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full max-w-md bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-2 border-[var(--purple)] rounded-2xl p-8 shadow-[0_0_60px_rgba(168,85,247,0.5)]">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={24} className="text-[var(--muted-foreground)]" />
              </button>
              
              {/* Header */}
              <div className="text-center mb-8">
                <h2 
                  className="text-4xl mb-2"
                  style={{
                    background: 'linear-gradient(135deg, var(--gold) 0%, var(--purple-bright) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 700,
                  }}
                >
                  {t('settings')}
                </h2>
              </div>

              {/* Language Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[var(--muted-foreground)] mb-4">
                  <Globe size={24} className="text-[var(--purple)]" />
                  <span className="text-lg">{t('language')}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => onLanguageChange('en')}
                    className={`
                      p-4 rounded-xl border-2 transition-all duration-300
                      ${currentLanguage === 'en' 
                        ? 'border-[var(--gold)] bg-[var(--gold)]/20 shadow-[0_0_20px_rgba(255,215,0,0.4)]' 
                        : 'border-[var(--border)] hover:border-[var(--purple)]'
                      }
                    `}
                  >
                    <div className="text-3xl mb-2">🇬🇧</div>
                    <div className="text-lg">{t('english')}</div>
                  </button>

                  <button
                    onClick={() => onLanguageChange('tr')}
                    className={`
                      p-4 rounded-xl border-2 transition-all duration-300
                      ${currentLanguage === 'tr' 
                        ? 'border-[var(--gold)] bg-[var(--gold)]/20 shadow-[0_0_20px_rgba(255,215,0,0.4)]' 
                        : 'border-[var(--border)] hover:border-[var(--purple)]'
                      }
                    `}
                  >
                    <div className="text-3xl mb-2">🇹🇷</div>
                    <div className="text-lg">{t('turkish')}</div>
                  </button>
                </div>
              </div>

              {/* Close button */}
              <div className="mt-8">
                <GameButton
                  variant="primary"
                  size="lg"
                  onClick={onClose}
                  className="w-full"
                >
                  {t('close')}
                </GameButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
