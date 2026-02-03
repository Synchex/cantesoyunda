import { motion } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { GameButton } from './GameButton';
import { Video, ShoppingCart } from 'lucide-react';
import { Language, getTranslation } from '../data/translations';
import { toast } from 'sonner';

interface CreditModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: Language;
}

export function CreditModal({ isOpen, onClose, language }: CreditModalProps) {
    const t = (key: any) => getTranslation(language, key);

    const handleWatchAds = () => {
        toast.info(t('comingSoon'));
    };

    const handlePurchase = () => {
        toast.info(t('comingSoon'));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-2 border-[var(--purple)] shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                <DialogHeader>
                    <DialogTitle
                        className="text-3xl text-center mb-6"
                        style={{
                            background: 'linear-gradient(135deg, var(--gold) 0%, var(--purple-bright) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {t('getMoreCredits')}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 mt-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <GameButton
                            variant="secondary"
                            size="lg"
                            onClick={handleWatchAds}
                            className="w-full flex items-center justify-center gap-3"
                        >
                            <Video size={24} />
                            {t('watchAds')}
                        </GameButton>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <GameButton
                            variant="gold"
                            size="lg"
                            onClick={handlePurchase}
                            className="w-full flex items-center justify-center gap-3"
                        >
                            <ShoppingCart size={24} />
                            {t('purchaseCoins')}
                        </GameButton>
                    </motion.div>
                </div>

                {/* Decorative particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[var(--gold)] rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
