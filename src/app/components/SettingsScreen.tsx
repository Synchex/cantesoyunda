import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import { Language, getTranslation } from '../data/translations';

interface SettingsScreenProps {
    language: Language;
    onLanguageChange: (lang: Language) => void;
}

export function SettingsScreen({ language, onLanguageChange }: SettingsScreenProps) {
    const t = (key: any) => getTranslation(language, key);

    return (
        <div
            className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pb-20"
            style={{ backgroundColor: '#0E0E16' }}
        >
            {/* Background gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(180deg, #0E0E16 0%, #1a1a2e 50%, #0E0E16 100%)',
                }}
            />

            {/* Subtle spotlight */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
                }}
            />

            {/* Content */}
            <motion.div
                className="relative z-10 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <h1
                        className="text-5xl mb-2"
                        style={{
                            background: 'linear-gradient(180deg, #F4E4C1 0%, #D4AF37 50%, #A67C00 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontWeight: 800,
                            textShadow: '0 2px 20px rgba(212, 175, 55, 0.3)',
                        }}
                    >
                        {t('settings')}
                    </h1>
                </div>

                {/* Settings Card */}
                <div
                    className="rounded-xl p-8 border backdrop-blur-md"
                    style={{
                        background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.9) 0%, rgba(30, 30, 45, 0.8) 100%)',
                        borderColor: 'rgba(212, 175, 55, 0.3)',
                        boxShadow: '0 0 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    }}
                >
                    {/* Language Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Globe
                                size={24}
                                style={{
                                    color: '#D4AF37',
                                    filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))',
                                }}
                            />
                            <span
                                className="text-lg font-semibold"
                                style={{ color: '#ECECEC' }}
                            >
                                {t('language')}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* English Button */}
                            <motion.button
                                onClick={() => onLanguageChange('en')}
                                className="p-6 rounded-lg border-2 transition-all duration-300"
                                style={{
                                    background: language === 'en'
                                        ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(166, 124, 0, 0.1) 100%)'
                                        : 'rgba(30, 30, 45, 0.5)',
                                    borderColor: language === 'en'
                                        ? 'rgba(212, 175, 55, 0.7)'
                                        : 'rgba(212, 175, 55, 0.2)',
                                    boxShadow: language === 'en'
                                        ? '0 0 30px rgba(212, 175, 55, 0.3)'
                                        : 'none',
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    borderColor: 'rgba(212, 175, 55, 0.6)',
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="text-4xl mb-3">🇬🇧</div>
                                <div
                                    className="text-base font-semibold"
                                    style={{
                                        color: language === 'en' ? '#D4AF37' : '#ECECEC',
                                        opacity: language === 'en' ? 1 : 0.7,
                                    }}
                                >
                                    {t('english')}
                                </div>
                            </motion.button>

                            {/* Turkish Button */}
                            <motion.button
                                onClick={() => onLanguageChange('tr')}
                                className="p-6 rounded-lg border-2 transition-all duration-300"
                                style={{
                                    background: language === 'tr'
                                        ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(166, 124, 0, 0.1) 100%)'
                                        : 'rgba(30, 30, 45, 0.5)',
                                    borderColor: language === 'tr'
                                        ? 'rgba(212, 175, 55, 0.7)'
                                        : 'rgba(212, 175, 55, 0.2)',
                                    boxShadow: language === 'tr'
                                        ? '0 0 30px rgba(212, 175, 55, 0.3)'
                                        : 'none',
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    borderColor: 'rgba(212, 175, 55, 0.6)',
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="text-4xl mb-3">🇹🇷</div>
                                <div
                                    className="text-base font-semibold"
                                    style={{
                                        color: language === 'tr' ? '#D4AF37' : '#ECECEC',
                                        opacity: language === 'tr' ? 1 : 0.7,
                                    }}
                                >
                                    {t('turkish')}
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Info text */}
                <motion.p
                    className="text-center mt-6 text-sm"
                    style={{
                        color: 'rgba(236, 236, 236, 0.4)',
                        letterSpacing: '0.02em',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {language === 'tr'
                        ? 'Dil değişiklikleri anında uygulanır'
                        : 'Language changes apply immediately'}
                </motion.p>
            </motion.div>
        </div>
    );
}
