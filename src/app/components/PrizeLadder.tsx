import { motion } from 'motion/react';
import { PRIZE_LADDER, formatPrizeFull } from '../data/prizeLadder';
import { ArenaCoinIcon } from './ArenaCoinIcon';

interface PrizeLadderProps {
    currentQuestionNumber: number; // 1-based
}

export function PrizeLadder({ currentQuestionNumber }: PrizeLadderProps) {
    return (
        <div className="w-64 h-full flex flex-col justify-center">
            <div
                className="rounded-lg border p-4 backdrop-blur-md"
                style={{
                    background: 'linear-gradient(135deg, rgba(14, 14, 22, 0.95) 0%, rgba(20, 20, 30, 0.9) 100%)',
                    borderColor: 'rgba(212, 175, 55, 0.2)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                }}
            >
                <h3
                    className="text-xs uppercase tracking-wider mb-4 text-center"
                    style={{
                        color: 'rgba(212, 175, 55, 0.7)',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                    }}
                >
                    Prize Ladder
                </h3>

                <div className="space-y-1.5">
                    {/* Reverse order - highest prize at top like Millionaire */}
                    {[...PRIZE_LADDER].reverse().map((item) => {
                        const isCurrent = item.question === currentQuestionNumber;
                        const isPast = item.question < currentQuestionNumber;
                        const isFuture = item.question > currentQuestionNumber;

                        return (
                            <motion.div
                                key={item.question}
                                className="relative flex items-center justify-between px-3 py-2 rounded-md transition-all duration-300"
                                style={{
                                    background: isCurrent
                                        ? 'linear-gradient(90deg, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.15) 100%)'
                                        : isPast
                                            ? 'rgba(212, 175, 55, 0.08)'
                                            : 'transparent',
                                    borderLeft: isCurrent ? '3px solid #D4AF37' : '3px solid transparent',
                                    boxShadow: isCurrent ? '0 0 20px rgba(212, 175, 55, 0.3)' : 'none',
                                    opacity: isFuture ? 0.4 : 1,
                                }}
                                animate={{
                                    scale: isCurrent ? 1.02 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Question number */}
                                <span
                                    className="text-xs font-semibold min-w-[24px]"
                                    style={{
                                        color: isCurrent ? '#D4AF37' : isPast ? 'rgba(212, 175, 55, 0.6)' : 'rgba(236, 236, 236, 0.5)',
                                    }}
                                >
                                    {item.question}
                                </span>

                                {/* Prize amount */}
                                <div className="flex items-center gap-1.5">
                                    <ArenaCoinIcon
                                        size={14}
                                        color={isCurrent ? '#D4AF37' : isPast ? 'rgba(212, 175, 55, 0.6)' : 'rgba(236, 236, 236, 0.4)'}
                                    />
                                    <span
                                        className="text-xs font-bold tabular-nums"
                                        style={{
                                            color: isCurrent ? '#D4AF37' : isPast ? 'rgba(212, 175, 55, 0.6)' : 'rgba(236, 236, 236, 0.5)',
                                            textShadow: isCurrent ? '0 0 10px rgba(212, 175, 55, 0.5)' : 'none',
                                        }}
                                    >
                                        {formatPrizeFull(item.prize)}
                                    </span>
                                </div>

                                {/* Glow effect for current */}
                                {isCurrent && (
                                    <motion.div
                                        className="absolute inset-0 rounded-md pointer-events-none"
                                        style={{
                                            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                                        }}
                                        animate={{
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
