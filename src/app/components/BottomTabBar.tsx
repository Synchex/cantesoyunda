import { motion } from 'motion/react';
import { Home, Clock, Trophy, Database, Settings } from 'lucide-react';
import { Language, getTranslation } from '../data/translations';

export type TabType = 'home' | 'game-history' | 'leaderboard' | 'database' | 'settings';

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
            id: 'game-history' as TabType,
            icon: Clock,
            label: t('gameHistory'),
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
        {
            id: 'settings' as TabType,
            icon: Settings,
            label: t('settings'),
        },
    ];

    return (
        <motion.div
            className="fixed bottom-0 left-0 right-0 z-50"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <div
                className="relative mx-auto max-w-md"
                style={{
                    background: 'linear-gradient(180deg, rgba(14, 14, 22, 0.98) 0%, rgba(20, 20, 30, 0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                    boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
            >
                {/* Metallic sheen at top */}
                <div
                    className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
                    }}
                />

                <div className="flex items-center justify-evenly px-4 py-3 pb-safe">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const Icon = tab.icon;

                        return (
                            <motion.button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className="flex flex-col items-center gap-1.5 relative"
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    minWidth: '70px',
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                }}
                            >
                                {/* Glow halo behind active tab */}
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-xl pointer-events-none"
                                        style={{
                                            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                                            filter: 'blur(12px)',
                                        }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: [0.6, 1, 0.6],
                                            scale: 1,
                                        }}
                                        transition={{
                                            opacity: { duration: 2, repeat: Infinity },
                                            scale: { duration: 0.3 },
                                        }}
                                    />
                                )}

                                {/* Icon */}
                                <motion.div
                                    className="relative z-10"
                                    animate={{
                                        y: isActive ? -2 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Icon
                                        size={22}
                                        style={{
                                            color: isActive ? '#D4AF37' : 'rgba(236, 236, 236, 0.4)',
                                            strokeWidth: 2,
                                            filter: isActive ? 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))' : 'none',
                                            transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                                        }}
                                    />
                                </motion.div>

                                {/* Label */}
                                <motion.span
                                    className="relative z-10"
                                    animate={{
                                        opacity: isActive ? 1 : 0.5,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        fontSize: '11px',
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? '#D4AF37' : 'rgba(236, 236, 236, 0.5)',
                                        letterSpacing: '0.02em',
                                        textShadow: isActive ? '0 0 8px rgba(212, 175, 55, 0.4)' : 'none',
                                        transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                                    }}
                                >
                                    {tab.label}
                                </motion.span>

                                {/* Gold underline indicator */}
                                {isActive && (
                                    <motion.div
                                        className="absolute -bottom-3 left-1/2 h-0.5 rounded-full z-10"
                                        style={{
                                            width: '40px',
                                            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                                            transform: 'translateX(-50%)',
                                            boxShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
                                        }}
                                        layoutId="activeTabIndicator"
                                        transition={{
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 30,
                                        }}
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
