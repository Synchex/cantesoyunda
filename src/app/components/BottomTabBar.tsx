import { motion } from 'motion/react';
import { Home, Bot, Trophy, Database } from 'lucide-react';
import { Language, getTranslation } from '../data/translations';

export type TabType = 'home' | 'ai-assistant' | 'leaderboard' | 'database';

interface BottomTabBarProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    language: Language;
}

export function BottomTabBar({ activeTab, onTabChange, language }: BottomTabBarProps) {
    const t = (key: any) => getTranslation(language, key);

    const tabs = [
        {
            id: 'home' as TabType,
            icon: Home,
            label: t('home'),
        },
        {
            id: 'ai-assistant' as TabType,
            icon: Bot,
            label: t('aiAssistant'),
        },
        {
            id: 'leaderboard' as TabType,
            icon: Trophy,
            label: t('leaderboard'),
        },
        {
            id: 'database' as TabType,
            icon: Database,
            label: t('database'),
        },
    ];

    return (
        <motion.div
            className="fixed bottom-0 left-0 right-0 z-50"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <div
                className="relative mx-auto max-w-md"
                style={{
                    background: 'rgba(15, 15, 25, 0.95)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '24px 24px 0 0',
                    boxShadow: '0 -2px 20px rgba(248, 213, 89, 0.15)',
                    borderTop: '1px solid rgba(248, 213, 89, 0.2)',
                }}
            >
                <div className="flex items-center justify-evenly px-6 py-4 pb-safe">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const Icon = tab.icon;

                        return (
                            <motion.button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className="flex flex-col items-center gap-1 relative"
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    minWidth: '70px',
                                }}
                            >
                                {/* Active glow indicator */}
                                {isActive && (
                                    <motion.div
                                        className="absolute -top-1 left-1/2 w-12 h-12 rounded-full"
                                        style={{
                                            background: 'radial-gradient(circle, rgba(248, 213, 89, 0.3) 0%, transparent 70%)',
                                            transform: 'translateX(-50%)',
                                            filter: 'blur(8px)',
                                        }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: [0.6, 1, 0.6],
                                            scale: [0.9, 1, 0.9],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    />
                                )}

                                {/* Icon */}
                                <motion.div
                                    animate={{
                                        scale: isActive ? 1.1 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        position: 'relative',
                                        zIndex: 1,
                                    }}
                                >
                                    <Icon
                                        size={24}
                                        style={{
                                            color: isActive ? 'var(--gold)' : 'rgba(255, 255, 255, 0.4)',
                                            strokeWidth: isActive ? 2.5 : 2,
                                            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    />
                                </motion.div>

                                {/* Label */}
                                <motion.span
                                    animate={{
                                        opacity: isActive ? 1 : 0.6,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? 'var(--gold)' : 'rgba(255, 255, 255, 0.5)',
                                        letterSpacing: '0.3px',
                                        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    {tab.label}
                                </motion.span>

                                {/* Active indicator dot */}
                                {isActive && (
                                    <motion.div
                                        className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full"
                                        style={{
                                            background: 'var(--gold)',
                                            transform: 'translateX(-50%)',
                                            boxShadow: '0 0 8px var(--gold)',
                                        }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
