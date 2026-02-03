import { motion } from 'motion/react';
import { Bot, Sparkles } from 'lucide-react';
import { Language, getTranslation } from '../data/translations';
import { CreditBar } from './CreditBar';

interface AIAssistantScreenProps {
    language: Language;
}

export function AIAssistantScreen({ language }: AIAssistantScreenProps) {
    const t = (key: any) => getTranslation(language, key);

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
            {/* Credit Bar */}
            <CreditBar language={language} />

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-darker)] to-[var(--bg-dark)]">
                <motion.div
                    className="absolute top-1/3 left-1/3 w-96 h-96 bg-[var(--purple)]/10 rounded-full blur-[100px]"
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
                <motion.div
                    className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-[100px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 7,
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
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <div className="relative">
                        <Bot
                            size={64}
                            style={{
                                color: 'var(--purple)',
                                strokeWidth: 1.5,
                            }}
                        />
                        <motion.div
                            className="absolute -top-2 -right-2"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <Sparkles
                                size={24}
                                style={{
                                    color: 'var(--gold)',
                                    fill: 'var(--gold)',
                                }}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Title */}
                <h1
                    style={{
                        fontSize: '32px',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, var(--gold) 0%, var(--purple) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '8px',
                    }}
                >
                    {t('aiAssistant')}
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
