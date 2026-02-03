import { motion, AnimatePresence } from 'motion/react';
import { Coins, Plus } from 'lucide-react';
import { useState } from 'react';
import { useCredits } from '../context/CreditContext';
import { CreditModal } from './CreditModal';
import { Language, getTranslation } from '../data/translations';

interface CreditBarProps {
    language: Language;
}

export function CreditBar({ language }: CreditBarProps) {
    const { credits, timeUntilReset } = useCredits();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const t = (key: any, params?: any) => getTranslation(language, key, params);

    const getWarningState = () => {
        if (credits < 50) return 'critical';
        if (credits < 100) return 'low';
        return 'normal';
    };

    const warningState = getWarningState();

    const getBorderColor = () => {
        switch (warningState) {
            case 'critical':
                return 'var(--wrong)';
            case 'low':
                return 'var(--gold-dark)';
            default:
                return 'var(--gold)';
        }
    };

    const getTextColor = () => {
        switch (warningState) {
            case 'critical':
                return 'var(--wrong)';
            case 'low':
                return '#ff9800'; // Orange
            default:
                return 'var(--gold)';
        }
    };

    return (
        <>
            <motion.div
                className="fixed top-6 left-6 z-20"
                initial={{ opacity: 0, x: -50 }}
                animate={{
                    opacity: 1,
                    x: 0,
                    scale: warningState !== 'normal' ? [1, 1.05, 1] : 1,
                }}
                transition={{
                    duration: 0.5,
                    scale: {
                        duration: 1,
                        repeat: warningState !== 'normal' ? Infinity : 0,
                        ease: 'easeInOut',
                    }
                }}
            >
                <div
                    className="relative px-4 py-3 rounded-2xl backdrop-blur-md border-2 transition-all duration-300"
                    style={{
                        background: 'linear-gradient(135deg, rgba(26, 15, 46, 0.9) 0%, rgba(10, 5, 20, 0.8) 100%)',
                        borderColor: getBorderColor(),
                        boxShadow: `0 0 ${warningState === 'critical' ? '30' : '20'}px ${getBorderColor()}60`,
                    }}
                >
                    {/* Main credit display */}
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={{
                                rotate: warningState === 'critical' ? [0, -10, 10, -10, 10, 0] : 0,
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: warningState === 'critical' ? Infinity : 0,
                                repeatDelay: 1,
                            }}
                        >
                            <Coins
                                size={28}
                                style={{ color: getTextColor() }}
                            />
                        </motion.div>

                        <motion.span
                            className="text-2xl font-bold min-w-[60px]"
                            style={{ color: getTextColor() }}
                            key={credits}
                            initial={{ scale: 1.3, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {credits}
                        </motion.span>

                        <motion.button
                            className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                            style={{
                                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                                borderColor: 'var(--purple)',
                            }}
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: 'rgba(168, 85, 247, 0.3)',
                                boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)',
                            }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={18} className="text-[var(--purple)]" />
                        </motion.button>
                    </div>

                    {/* Countdown timer */}
                    <motion.div
                        className="mt-2 text-xs text-center"
                        style={{ color: 'var(--muted-foreground)' }}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {t('dailyRefillIn')} {timeUntilReset}
                    </motion.div>

                    {/* Glow effect */}
                    <AnimatePresence>
                        {warningState !== 'normal' && (
                            <motion.div
                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle, ${getTextColor()}20 0%, transparent 70%)`,
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <CreditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                language={language}
            />
        </>
    );
}
