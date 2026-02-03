import { motion } from 'motion/react';
import { ArenaCoinIcon } from './ArenaCoinIcon';
import { formatPrizeFull } from '../data/prizeLadder';

interface PrizeDisplayProps {
    currentPrize: number;
}

export function PrizeDisplay({ currentPrize }: PrizeDisplayProps) {
    return (
        <motion.div
            className="fixed top-6 right-6 z-20 px-5 py-3 rounded-full border-2 backdrop-blur-md"
            style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95) 0%, rgba(30, 30, 45, 0.9) 100%)',
                borderColor: 'rgba(212, 175, 55, 0.5)',
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Metallic sheen */}
            <div
                className="absolute inset-0 rounded-full pointer-events-none opacity-30"
                style={{
                    background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
                }}
            />

            <div className="relative flex items-center gap-3">
                <span
                    className="text-xs uppercase tracking-wider"
                    style={{
                        color: 'rgba(236, 236, 236, 0.6)',
                        fontWeight: 600,
                    }}
                >
                    Current Prize
                </span>

                <div className="flex items-center gap-2">
                    <ArenaCoinIcon size={22} color="#D4AF37" />
                    <motion.span
                        className="text-xl font-bold tabular-nums"
                        style={{
                            color: '#D4AF37',
                            textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                            letterSpacing: '-0.02em',
                        }}
                        key={currentPrize}
                        initial={{ scale: 1.2, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {formatPrizeFull(currentPrize)}
                    </motion.span>
                </div>
            </div>
        </motion.div>
    );
}
