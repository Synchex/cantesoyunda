import { motion, AnimatePresence } from 'motion/react';
import { Coins, Plus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useCredits } from '../context/CreditContext';
import { useYuan } from '../context/YuanContext';
import { CreditModal } from './CreditModal';
import { Language, getTranslation } from '../data/translations';
import { YuanIcon } from './YuanIcon';
import { formatPrize } from '../data/prizeLadder';

interface CreditBarProps {
    language: Language;
}

export function CreditBar({ language }: CreditBarProps) {
    const { credits, timeUntilReset } = useCredits();
    const { totalYuan } = useYuan();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayYuan, setDisplayYuan] = useState(totalYuan);
    const [isYuanAnimating, setIsYuanAnimating] = useState(false);
    const prevYuanRef = useRef(totalYuan);
    const t = (key: any, params?: any) => getTranslation(language, key, params);

    // Animate yuan count-up when it increases
    useEffect(() => {
        if (totalYuan > prevYuanRef.current) {
            setIsYuanAnimating(true);
            const diff = totalYuan - prevYuanRef.current;
            const steps = 20;
            const stepAmount = diff / steps;
            let current = prevYuanRef.current;
            let step = 0;

            const interval = setInterval(() => {
                step++;
                current += stepAmount;
                setDisplayYuan(Math.floor(current));

                if (step >= steps) {
                    clearInterval(interval);
                    setDisplayYuan(totalYuan);
                    setIsYuanAnimating(false);
                }
            }, 30);

            prevYuanRef.current = totalYuan;
            return () => clearInterval(interval);
        } else {
            setDisplayYuan(totalYuan);
            prevYuanRef.current = totalYuan;
        }
    }, [totalYuan]);

    const getWarningState = () => {
        if (credits < 50) return 'critical';
        if (credits < 100) return 'low';
        return 'normal';
    };

    const warningState = getWarningState();

    const getBorderColor = () => {
        switch (warningState) {
            case 'critical':
                return 'rgba(255, 60, 80, 0.6)';
            case 'low':
                return 'rgba(255, 152, 0, 0.6)';
            default:
                return 'rgba(212, 175, 55, 0.5)';
        }
    };

    const getTextColor = () => {
        switch (warningState) {
            case 'critical':
                return '#ff3c50';
            case 'low':
                return '#ff9800';
            default:
                return '#D4AF37';
        }
    };

    return (
        <>
            <motion.div
                className="fixed top-6 left-6 z-20 flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                    opacity: 1,
                    x: 0,
                }}
                transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {/* Credits Pill */}
                <motion.div
                    className="relative px-5 py-3 rounded-full backdrop-blur-md border-2 transition-all duration-300"
                    style={{
                        background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.9) 0%, rgba(30, 30, 45, 0.8) 100%)',
                        borderColor: getBorderColor(),
                        boxShadow: `0 0 30px ${getBorderColor()}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                    }}
                    animate={{
                        scale: warningState === 'critical' ? [1, 1.03, 1] : 1,
                    }}
                    transition={{
                        scale: {
                            duration: 1.5,
                            repeat: warningState === 'critical' ? Infinity : 0,
                        }
                    }}
                >
                    {/* Metallic sheen overlay */}
                    <div
                        className="absolute inset-0 rounded-full pointer-events-none opacity-30"
                        style={{
                            background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
                        }}
                    />

                    {/* Main credit display */}
                    <div className="relative flex items-center gap-3">
                        <motion.div
                            animate={{
                                rotate: warningState === 'critical' ? [0, -5, 5, -5, 5, 0] : 0,
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: warningState === 'critical' ? Infinity : 0,
                                repeatDelay: 1,
                            }}
                        >
                            <Coins
                                size={22}
                                style={{
                                    color: getTextColor(),
                                    filter: `drop-shadow(0 0 6px ${getTextColor()})`,
                                }}
                            />
                        </motion.div>

                        <motion.span
                            className="text-2xl font-bold min-w-[55px] tabular-nums"
                            style={{
                                color: getTextColor(),
                                textShadow: `0 0 10px ${getTextColor()}`,
                                letterSpacing: '-0.02em',
                            }}
                            key={credits}
                            initial={{ scale: 1.2, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {credits}
                        </motion.span>

                        <motion.button
                            className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                            style={{
                                background: 'linear-gradient(135deg, rgba(44, 47, 111, 0.4) 0%, rgba(44, 47, 111, 0.2) 100%)',
                                borderColor: 'rgba(212, 175, 55, 0.4)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                            }}
                            whileHover={{
                                scale: 1.08,
                                borderColor: 'rgba(212, 175, 55, 0.7)',
                                boxShadow: '0 0 15px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={16} style={{ color: '#D4AF37' }} />
                        </motion.button>
                    </div>

                    {/* Countdown timer */}
                    <motion.div
                        className="mt-2 text-[9px] text-center tracking-wide uppercase"
                        style={{
                            color: 'rgba(236, 236, 236, 0.35)',
                            letterSpacing: '0.08em',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {t('dailyRefillIn')} {timeUntilReset}
                    </motion.div>

                    {/* Warning pulse effect */}
                    <AnimatePresence>
                        {warningState !== 'normal' && (
                            <motion.div
                                className="absolute -inset-1 rounded-full pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle, ${getTextColor()}20 0%, transparent 70%)`,
                                    filter: 'blur(8px)',
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.4, 0.8, 0.4] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Yuan Pill */}
                <motion.div
                    className="relative px-5 py-3 rounded-full backdrop-blur-md border-2 transition-all duration-300"
                    style={{
                        background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.9) 0%, rgba(30, 30, 45, 0.8) 100%)',
                        borderColor: 'rgba(212, 175, 55, 0.5)',
                        boxShadow: '0 0 30px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        delay: 0.1,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {/* Metallic sheen overlay */}
                    <div
                        className="absolute inset-0 rounded-full pointer-events-none opacity-30"
                        style={{
                            background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
                        }}
                    />

                    {/* Yuan display */}
                    <div className="relative flex items-center gap-2">
                        <YuanIcon size={22} color="#D4AF37" />

                        <motion.span
                            className="text-2xl font-bold min-w-[60px] tabular-nums"
                            style={{
                                color: '#D4AF37',
                                textShadow: '0 0 10px #D4AF37',
                                letterSpacing: '-0.02em',
                            }}
                            animate={isYuanAnimating ? {
                                scale: [1, 1.1, 1],
                                textShadow: ['0 0 10px #D4AF37', '0 0 20px #D4AF37', '0 0 10px #D4AF37'],
                            } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            {formatPrize(displayYuan)}
                        </motion.span>
                    </div>

                    {/* Label */}
                    <motion.div
                        className="mt-1 text-[9px] text-center tracking-wide uppercase"
                        style={{
                            color: 'rgba(212, 175, 55, 0.6)',
                            letterSpacing: '0.08em',
                        }}
                    >
                        Yuan
                    </motion.div>

                    {/* Glow effect on animation */}
                    <AnimatePresence>
                        {isYuanAnimating && (
                            <motion.div
                                className="absolute -inset-1 rounded-full pointer-events-none"
                                style={{
                                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
                                    filter: 'blur(8px)',
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            <CreditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                language={language}
            />
        </>
    );
}
