import { motion } from 'motion/react';
import { Trophy, Star } from 'lucide-react';
import { Language, getTranslation } from '../data/translations';
import { CreditBar } from './CreditBar';

interface LeaderboardScreenProps {
    language: Language;
}

export function LeaderboardScreen({ language }: LeaderboardScreenProps) {
    const t = (key: any) => getTranslation(language, key);

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
            {/* Credit Bar */}
            <CreditBar language={language} />

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-darker)] to-[var(--bg-dark)]">
                <motion.div
                    className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-[100px]"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[var(--neon-green)]/10 rounded-full blur-[100px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Icon */}
                <motion.div
                    className="inline-flex items-center justify-center mb-6"
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <div className="relative">
                        <Trophy
                            size={64}
                            style={{
                                color: 'var(--gold)',
                                strokeWidth: 1.5,
                            }}
                        />
                        {/* Floating stars */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                style={{
                                    top: i === 0 ? '-10px' : i === 1 ? '10px' : '30px',
                                    left: i === 0 ? '-15px' : i === 1 ? '60px' : '20px',
                                }}
                                animate={{
                                    y: [0, -15, 0],
                                    opacity: [0.5, 1, 0.5],
                                    scale: [0.8, 1, 0.8],
                                }}
                                transition={{
                                    duration: 2 + i * 0.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: i * 0.3,
                                }}
                            >
                                <Star
                                    size={16}
                                    style={{
                                        color: 'var(--gold)',
                                        fill: 'var(--gold)',
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Title */}
                <h1
                    style={{
                        fontSize: '32px',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, var(--gold) 0%, var(--neon-green) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '8px',
                    }}
                >
                    {t('leaderboard')}
                </h1>

                {/* Coming Soon */}
                <motion.p
                    style={{
                        fontSize: '18px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontWeight: 400,
                    }}
                    animate={{
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    {t('comingSoon')}
                </motion.p>
            </motion.div>
        </div>
    );
}
