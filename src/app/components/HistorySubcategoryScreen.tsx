import { motion } from 'motion/react';
import { GameCard } from './GameCard';
import { Landmark, Crown, Scroll, Layers, Star, Globe, Columns } from 'lucide-react';
import { Language, getTranslation } from '../data/translations';
import { CreditBar } from './CreditBar';

// EN History subcategories
export type HistorySubcategoryEN = 'history_modern' | 'history_legends_empires' | 'history_ancient_early' | 'history_all';

// TR History subcategories
export type HistorySubcategoryTR = 'history_tr_turkish' | 'history_tr_world' | 'history_tr_ancient' | 'history_tr_all';

// Combined type for the screen
export type HistorySubcategory = HistorySubcategoryEN | HistorySubcategoryTR;

interface HistorySubcategoryScreenProps {
    onSelectSubcategory: (subcategory: HistorySubcategory) => void;
    language: Language;
}

export function HistorySubcategoryScreen({ onSelectSubcategory, language }: HistorySubcategoryScreenProps) {
    const t = (key: any) => getTranslation(language, key);

    // EN subcategories
    const subcategoriesEN = [
        {
            id: 'history_modern' as HistorySubcategory,
            name: t('historyModern'),
            icon: <Landmark size={56} />,
            description: t('historyModernDesc'),
            color: '#3B82F6', // Blue for modern
        },
        {
            id: 'history_legends_empires' as HistorySubcategory,
            name: t('historyLegendsEmpires'),
            icon: <Crown size={56} />,
            description: t('historyLegendsEmpiresDesc'),
            color: '#8B5CF6', // Purple for legends/empires
        },
        {
            id: 'history_ancient_early' as HistorySubcategory,
            name: t('historyAncientEarly'),
            icon: <Scroll size={56} />,
            description: t('historyAncientEarlyDesc'),
            color: '#D97706', // Amber for ancient
        },
        {
            id: 'history_all' as HistorySubcategory,
            name: t('historyAll'),
            icon: <Layers size={56} />,
            description: t('historyAllDesc'),
            color: '#10B981', // Emerald for all/mixed
            highlighted: true,
        },
    ];

    // TR subcategories
    const subcategoriesTR = [
        {
            id: 'history_tr_turkish' as HistorySubcategory,
            name: t('historyTrTurkish'),
            icon: <Star size={56} />,
            description: t('historyTrTurkishDesc'),
            color: '#EF4444', // Red for Turkish (flag color)
        },
        {
            id: 'history_tr_world' as HistorySubcategory,
            name: t('historyTrWorld'),
            icon: <Globe size={56} />,
            description: t('historyTrWorldDesc'),
            color: '#3B82F6', // Blue for world
        },
        {
            id: 'history_tr_ancient' as HistorySubcategory,
            name: t('historyTrAncient'),
            icon: <Columns size={56} />,
            description: t('historyTrAncientDesc'),
            color: '#D97706', // Amber for ancient
        },
        {
            id: 'history_tr_all' as HistorySubcategory,
            name: t('historyTrAll'),
            icon: <Layers size={56} />,
            description: t('historyTrAllDesc'),
            color: '#10B981', // Emerald for all/mixed
            highlighted: true,
        },
    ];

    // Choose subcategories based on language
    const subcategories = language === 'tr' ? subcategoriesTR : subcategoriesEN;

    // Gradient colors based on language
    const gradientStyle = language === 'tr'
        ? 'linear-gradient(135deg, #EF4444 0%, #3B82F6 33%, #D97706 66%, #10B981 100%)'
        : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 33%, #D97706 66%, #10B981 100%)';

    // Background glow colors based on language
    const topGlowColor = language === 'tr' ? '#EF4444' : '#8B5CF6';

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
            {/* Credit Bar */}
            <CreditBar language={language} />

            {/* Background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-darker)] to-[var(--bg-dark)]">
                <motion.div
                    className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full blur-[100px]"
                    style={{ backgroundColor: `${topGlowColor}1A` }}
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
                    className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-[#D97706]/10 rounded-full blur-[100px]"
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
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2
                        className="text-4xl md:text-5xl mb-3"
                        style={{
                            background: gradientStyle,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontWeight: 700,
                        }}
                    >
                        {t('chooseHistoryCategory')}
                    </h2>
                    <p className="text-lg text-[var(--muted-foreground)]">
                        {t('selectHistoryEra')}
                    </p>
                </motion.div>

                {/* History Subcategory Grid - 2x2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                    className="text-lg md:text-xl text-center mb-2"
                                    style={{ color: subcategory.color }}
                                >
                                    {subcategory.name}
                                </h3>
                                <p className="text-center text-sm text-[var(--muted-foreground)]">
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
