import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameButton } from './GameButton';
import { PlayCircle, X, Loader2, CheckCircle2 } from 'lucide-react';
import { Language } from '../data/translations';

interface ContinueModalProps {
    isOpen: boolean;
    onWatchAd: () => void;
    onDecline: () => void;
    language: Language;
}

type AdState = 'prompt' | 'loading' | 'completed';

export function ContinueModal({
    isOpen,
    onWatchAd,
    onDecline,
    language,
}: ContinueModalProps) {
    const [adState, setAdState] = useState<AdState>('prompt');

    useEffect(() => {
        if (isOpen) {
            setAdState('prompt');
        }
    }, [isOpen]);

    const handleWatchAd = () => {
        setAdState('loading');

        // Simulate ad loading for 2 seconds
        setTimeout(() => {
            setAdState('completed');

            // Show completion message for 500ms then continue
            setTimeout(() => {
                onWatchAd();
            }, 500);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={adState === 'prompt' ? onDecline : undefined}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <motion.div
                            className="relative bg-gradient-to-br from-[var(--card)] to-[var(--muted)] rounded-3xl border-2 border-[var(--border)] shadow-[0_0_60px_rgba(168,85,247,0.5)] w-full max-w-md pointer-events-auto overflow-hidden"
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            transition={{ type: 'spring', damping: 25 }}
                        >
                            {/* Glow effects */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-[var(--wrong)]/30 to-transparent blur-2xl pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple)]/10 via-transparent to-[var(--gold)]/10 pointer-events-none" />

                            {/* Content */}
                            <div className="relative p-8">
                                {/* Prompt State */}
                                {adState === 'prompt' && (
                                    <>
                                        {/* Icon */}
                                        <motion.div
                                            className="flex justify-center mb-6"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', delay: 0.2 }}
                                        >
                                            <div className="relative">
                                                <motion.div
                                                    className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--wrong)] to-[var(--wrong)]/60 flex items-center justify-center"
                                                    animate={{
                                                        boxShadow: [
                                                            '0 0 30px rgba(255,23,68,0.4)',
                                                            '0 0 50px rgba(255,23,68,0.7)',
                                                            '0 0 30px rgba(255,23,68,0.4)',
                                                        ],
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    <X size={48} className="text-white" strokeWidth={3} />
                                                </motion.div>
                                            </div>
                                        </motion.div>

                                        {/* Title */}
                                        <motion.h2
                                            className="text-4xl font-bold text-center mb-3"
                                            style={{
                                                color: 'var(--wrong)',
                                                textShadow: '0 0 20px var(--wrong)',
                                            }}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {language === 'tr' ? 'Yanlış!' : 'Wrong!'}
                                        </motion.h2>

                                        {/* Message */}
                                        <motion.p
                                            className="text-xl text-center text-[var(--muted-foreground)] mb-8"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {language === 'tr' ? 'Devam etmek için reklam izle' : 'Watch an ad to continue'}
                                        </motion.p>

                                        {/* Benefits */}
                                        <motion.div
                                            className="mb-8 p-4 rounded-xl bg-[var(--purple)]/10 border border-[var(--purple)]/30"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                                                <PlayCircle className="text-[var(--purple)] shrink-0" size={20} />
                                                <span>
                                                    {language === 'tr'
                                                        ? 'Aynı soruya geri dön ve tekrar dene'
                                                        : 'Return to the same question and try again'}
                                                </span>
                                            </div>
                                        </motion.div>

                                        {/* Buttons */}
                                        <motion.div
                                            className="space-y-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <GameButton
                                                variant="gold"
                                                size="lg"
                                                onClick={handleWatchAd}
                                                className="w-full"
                                            >
                                                <PlayCircle size={20} className="mr-2" />
                                                {language === 'tr' ? 'Reklam İzle (Devam Et)' : 'Watch Ad (Continue)'}
                                            </GameButton>

                                            <GameButton
                                                variant="secondary"
                                                size="md"
                                                onClick={onDecline}
                                                className="w-full"
                                            >
                                                {language === 'tr' ? 'Vazgeç' : 'Give Up'}
                                            </GameButton>
                                        </motion.div>
                                    </>
                                )}

                                {/* Loading State */}
                                {adState === 'loading' && (
                                    <motion.div
                                        className="text-center py-12"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <motion.div
                                            className="flex justify-center mb-6"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        >
                                            <Loader2 size={64} className="text-[var(--purple)]" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-[var(--purple)] mb-2">
                                            {language === 'tr' ? 'Reklam yükleniyor...' : 'Loading ad...'}
                                        </h3>
                                        <p className="text-[var(--muted-foreground)]">
                                            {language === 'tr' ? 'Lütfen bekleyin' : 'Please wait'}
                                        </p>
                                    </motion.div>
                                )}

                                {/* Completed State */}
                                {adState === 'completed' && (
                                    <motion.div
                                        className="text-center py-12"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <motion.div
                                            className="flex justify-center mb-6"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring' }}
                                        >
                                            <div
                                                className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--neon-green)] to-[var(--neon-green)]/60 flex items-center justify-center"
                                                style={{
                                                    boxShadow: '0 0 50px rgba(0,255,136,0.7)',
                                                }}
                                            >
                                                <CheckCircle2 size={48} className="text-white" strokeWidth={3} />
                                            </div>
                                        </motion.div>
                                        <h3 className="text-3xl font-bold text-[var(--neon-green)] mb-2">
                                            {language === 'tr' ? 'Reklam tamamlandı!' : 'Ad completed!'}
                                        </h3>
                                        <p className="text-[var(--muted-foreground)]">
                                            {language === 'tr' ? 'Soruya geri dönüyorsun...' : 'Returning to question...'}
                                        </p>
                                    </motion.div>
                                )}
                            </div>

                            {/* Bottom shine effect */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--purple)] to-transparent" />
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
