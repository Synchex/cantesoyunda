import { motion } from 'motion/react';
import { AlertCircle, Coins, Clock } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from './ui/alert-dialog';
import { GameButton } from './GameButton';
import { useCredits } from '../context/CreditContext';
import { Language, getTranslation } from '../data/translations';
import { useState } from 'react';
import { CreditModal } from './CreditModal';

interface InsufficientCreditsModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: Language;
}

export function InsufficientCreditsModal({ isOpen, onClose, language }: InsufficientCreditsModalProps) {
    const { credits, gameCost, timeUntilReset } = useCredits();
    const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
    const t = (key: any, params?: any) => getTranslation(language, key, params);

    const handleGetMoreCredits = () => {
        setIsCreditModalOpen(true);
    };

    return (
        <>
            <AlertDialog open={isOpen} onOpenChange={onClose}>
                <AlertDialogContent className="sm:max-w-md bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-2 border-[var(--wrong)] shadow-[0_0_40px_rgba(255,23,68,0.4)]">
                    <AlertDialogHeader>
                        <motion.div
                            className="flex justify-center mb-4"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, -10, 10, -10, 10, 0],
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatDelay: 1,
                            }}
                        >
                            <AlertCircle size={64} className="text-[var(--wrong)]" />
                        </motion.div>

                        <AlertDialogTitle
                            className="text-3xl text-center"
                            style={{ color: 'var(--wrong)' }}
                        >
                            {t('notEnoughCredits')}
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-center space-y-4 pt-4">
                            <div className="flex items-center justify-center gap-2 text-xl">
                                <Coins className="text-[var(--gold)]" size={24} />
                                <span className="text-[var(--muted-foreground)]">
                                    {t('currentCredits')}:
                                </span>
                                <span className="text-[var(--wrong)] font-bold">{credits}</span>
                            </div>

                            <div className="text-lg text-[var(--muted-foreground)]">
                                {t('needCredits', { amount: gameCost })}
                            </div>

                            <div className="flex items-center justify-center gap-2 text-sm p-3 rounded-lg bg-[var(--bg-dark)] border border-[var(--border)]">
                                <Clock size={16} className="text-[var(--neon-green)]" />
                                <span className="text-[var(--muted-foreground)]">
                                    {t('dailyRefillIn')} {timeUntilReset}
                                </span>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
                        <GameButton
                            variant="gold"
                            size="lg"
                            onClick={handleGetMoreCredits}
                            className="w-full"
                        >
                            {t('getMoreCredits')}
                        </GameButton>

                        <AlertDialogCancel asChild>
                            <GameButton
                                variant="secondary"
                                size="lg"
                                className="w-full mt-0"
                            >
                                {t('close')}
                            </GameButton>
                        </AlertDialogCancel>
                    </AlertDialogFooter>

                    {/* Animated warning border glow */}
                    <motion.div
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        style={{
                            border: '2px solid var(--wrong)',
                            opacity: 0.3,
                        }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    />
                </AlertDialogContent>
            </AlertDialog>

            <CreditModal
                isOpen={isCreditModalOpen}
                onClose={() => setIsCreditModalOpen(false)}
                language={language}
            />
        </>
    );
}
