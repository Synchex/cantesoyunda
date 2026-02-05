import { motion } from 'motion/react';
import { GameCard } from './GameCard';
import { Trophy, Flag, Award } from 'lucide-react';
import { Language, getTranslation } from '../data/translations';
import { CreditBar } from './CreditBar';

// Custom icons for Football and Basketball
function FootballIcon({ size = 64 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
        </svg>
    );
}

function BasketballIcon({ size = 64 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M4.93 4.93l14.14 14.14" />
            <path d="M19.07 4.93L4.93 19.07" />
            <path d="M12 2v20" />
            <path d="M2 12h20" />
        </svg>
    );
}

export type SportsSubcategory = 'general_sports' | 'general_football' | 'football' | 'basketball' | 'turkish_football' | 'turkish_sports' | 'legends_records';

interface SportsSubcategoryScreenProps {
    onSelectSubcategory: (subcategory: SportsSubcategory) => void;
    language: Language;
}

export function SportsSubcategoryScreen({ onSelectSubcategory, language }: SportsSubcategoryScreenProps) {
    const t = (key: any) => getTranslation(language, key);

    // English subcategories: General Sports, General Football, Basketball
    const englishSubcategories = [
        {
            id: 'general_sports' as SportsSubcategory,
            name: t('generalSports'),
            icon: <Trophy size={64} />,
            description: t('generalSportsDesc'),
            color: '#9C27B0', // Purple for mixed/all sports
        },
        {
            id: 'general_football' as SportsSubcategory,
            name: t('generalFootball'),
            icon: <FootballIcon size={64} />,
            description: t('generalFootballDesc'),
            color: '#4CAF50', // Green for football
        },
        {
            id: 'basketball' as SportsSubcategory,
            name: t('basketball'),
            icon: <BasketballIcon size={64} />,
            description: t('basketballDesc'),
            color: '#FF9800', // Orange for basketball
        },
    ];

    // Turkish subcategories: Genel Spor, Genel Futbol, Türk Futbolu, Basketbol
    const turkishSubcategories = [
        {
            id: 'general_sports' as SportsSubcategory,
            name: t('generalSports'),
            icon: <Trophy size={64} />,
            description: t('generalSportsDesc'),
            color: '#9C27B0', // Purple for mixed/all sports
        },
        {
            id: 'general_football' as SportsSubcategory,
            name: t('generalFootball'),
            icon: <FootballIcon size={64} />,
            description: t('generalFootballDesc'),
            color: '#2196F3', // Blue for world/general football
        },
        {
            id: 'turkish_football' as SportsSubcategory,
            name: t('footballLabel'), // "Türk Futbolu"
            icon: <Flag size={64} />,
            description: t('footballDesc'),
            color: '#E53935', // Red for Turkish football (Turkish flag color)
        },
        {
            id: 'basketball' as SportsSubcategory,
            name: t('basketball'),
            icon: <BasketballIcon size={64} />,
            description: t('basketballDesc'),
            color: '#FF9800', // Orange for basketball
        },
    ];

    // Select subcategories based on language
    const subcategories = language === 'tr' ? turkishSubcategories : englishSubcategories;

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
            {/* Credit Bar */}
            <CreditBar language={language} />

            {/* Background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-darker)] to-[var(--bg-dark)]">
                <motion.div
                    className="absolute top-1/3 right-1/3 w-96 h-96 bg-[#4CAF50]/10 rounded-full blur-[100px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-[#FF9800]/10 rounded-full blur-[100px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.2, 0.3],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2
                        className="text-5xl mb-4"
                        style={{
                            background: 'linear-gradient(135deg, #4CAF50 0%, #FF9800 50%, #D4AF37 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontWeight: 700,
                        }}
                    >
                        {t('chooseSportsCategory')}
                    </h2>
                    <p className="text-xl text-[var(--muted-foreground)]">
                        {t('selectSportsField')}
                    </p>
                </motion.div>

                {/* Sports Subcategory Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subcategories.map((subcategory, index) => (
                        <motion.div
                            key={subcategory.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <GameCard
                                onClick={() => onSelectSubcategory(subcategory.id)}
                                icon={<div style={{ color: subcategory.color }}>{subcategory.icon}</div>}
                                glowing={(subcategory as any).highlighted}
                                className="h-full"
                            >
                                <h3
                                    className="text-2xl text-center mb-2"
                                    style={{ color: subcategory.color }}
                                >
                                    {subcategory.name}
                                </h3>
                                <p className="text-center text-[var(--muted-foreground)]">
                                    {subcategory.description}
                                </p>
                            </GameCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
