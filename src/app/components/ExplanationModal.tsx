import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Lightbulb, HelpCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Language } from '../data/translations';

interface ExplanationModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: Language;
    isLoading: boolean;
    error?: string | null;
    explanationMarkdown?: string;
    memoryTip?: string;
    similarQuestion?: string;
    cached?: boolean;
}

export function ExplanationModal({
    isOpen,
    onClose,
    language,
    isLoading,
    error,
    explanationMarkdown,
    memoryTip,
    similarQuestion,
    cached,
}: ExplanationModalProps) {
    const t = {
        title: language === 'tr' ? 'AI Açıklaması' : 'AI Explanation',
        loading: language === 'tr' ? 'Açıklama oluşturuluyor...' : 'Generating explanation...',
        memoryTipLabel: language === 'tr' ? 'Hafıza İpucu' : 'Memory Tip',
        similarLabel: language === 'tr' ? 'Benzer Soru' : 'Similar Question',
        close: language === 'tr' ? 'Kapat' : 'Close',
        retry: language === 'tr' ? 'Tekrar Dene' : 'Retry',
        cachedNote: language === 'tr' ? 'Önbellekten yüklendi' : 'Loaded from cache',
        errorTitle: language === 'tr' ? 'Bir hata oluştu' : 'An error occurred',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:w-full md:max-w-2xl md:-translate-x-1/2 z-50 flex items-start justify-center overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <div
                            className="w-full max-h-full overflow-y-auto rounded-2xl border-2"
                            style={{
                                background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.98) 0%, rgba(30, 30, 50, 0.98) 100%)',
                                borderColor: 'rgba(212, 175, 55, 0.4)',
                                boxShadow: '0 0 60px rgba(212, 175, 55, 0.2), 0 25px 50px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            {/* Header */}
                            <div
                                className="sticky top-0 flex items-center justify-between p-5 border-b z-10"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.98) 0%, rgba(30, 30, 50, 0.98) 100%)',
                                    borderColor: 'rgba(212, 175, 55, 0.2)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)',
                                            border: '1px solid rgba(212, 175, 55, 0.3)',
                                        }}
                                    >
                                        <Sparkles size={20} style={{ color: '#D4AF37' }} />
                                    </div>
                                    <div>
                                        <h2
                                            className="text-xl font-bold"
                                            style={{ color: '#D4AF37' }}
                                        >
                                            {t.title}
                                        </h2>
                                        {cached && (
                                            <span className="text-xs" style={{ color: 'rgba(212, 175, 55, 0.6)' }}>
                                                {t.cachedNote}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full transition-colors hover:bg-white/10"
                                >
                                    <X size={24} style={{ color: 'rgba(236, 236, 236, 0.6)' }} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-5">
                                {/* Loading State */}
                                {isLoading && (
                                    <motion.div
                                        className="flex flex-col items-center justify-center py-16"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        >
                                            <Loader2 size={48} style={{ color: '#D4AF37' }} />
                                        </motion.div>
                                        <p
                                            className="mt-4 text-lg"
                                            style={{ color: 'rgba(236, 236, 236, 0.7)' }}
                                        >
                                            {t.loading}
                                        </p>
                                        <motion.div
                                            className="mt-2 flex gap-1"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ background: '#D4AF37' }}
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        delay: i * 0.2,
                                                    }}
                                                />
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Error State */}
                                {error && !isLoading && (
                                    <motion.div
                                        className="flex flex-col items-center justify-center py-12"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div
                                            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                                            style={{
                                                background: 'rgba(255, 60, 80, 0.2)',
                                                border: '2px solid rgba(255, 60, 80, 0.4)',
                                            }}
                                        >
                                            <AlertCircle size={32} style={{ color: '#ff3c50' }} />
                                        </div>
                                        <h3
                                            className="text-lg font-semibold mb-2"
                                            style={{ color: '#ff3c50' }}
                                        >
                                            {t.errorTitle}
                                        </h3>
                                        <p
                                            className="text-center max-w-sm"
                                            style={{ color: 'rgba(236, 236, 236, 0.6)' }}
                                        >
                                            {error}
                                        </p>
                                    </motion.div>
                                )}

                                {/* Success State */}
                                {!isLoading && !error && explanationMarkdown && (
                                    <motion.div
                                        className="space-y-5"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {/* Main Explanation */}
                                        <div
                                            className="prose prose-invert max-w-none p-4 rounded-xl"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                            }}
                                        >
                                            <div
                                                className="text-sm leading-relaxed whitespace-pre-wrap"
                                                style={{ color: '#ECECEC' }}
                                                dangerouslySetInnerHTML={{
                                                    __html: explanationMarkdown
                                                        .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #D4AF37">$1</strong>')
                                                        .replace(/\n/g, '<br />')
                                                }}
                                            />
                                        </div>

                                        {/* Memory Tip */}
                                        {memoryTip && (
                                            <motion.div
                                                className="p-4 rounded-xl"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 136, 0.05) 100%)',
                                                    border: '1px solid rgba(0, 255, 136, 0.3)',
                                                }}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                                        style={{
                                                            background: 'rgba(0, 255, 136, 0.2)',
                                                        }}
                                                    >
                                                        <Lightbulb size={16} style={{ color: '#00ff88' }} />
                                                    </div>
                                                    <div>
                                                        <h4
                                                            className="text-sm font-semibold mb-1"
                                                            style={{ color: '#00ff88' }}
                                                        >
                                                            {t.memoryTipLabel}
                                                        </h4>
                                                        <p
                                                            className="text-sm"
                                                            style={{ color: 'rgba(236, 236, 236, 0.8)' }}
                                                        >
                                                            {memoryTip}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Similar Question */}
                                        {similarQuestion && (
                                            <motion.div
                                                className="p-4 rounded-xl"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1) 0%, rgba(138, 43, 226, 0.05) 100%)',
                                                    border: '1px solid rgba(138, 43, 226, 0.3)',
                                                }}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                                        style={{
                                                            background: 'rgba(138, 43, 226, 0.2)',
                                                        }}
                                                    >
                                                        <HelpCircle size={16} style={{ color: '#8a2be2' }} />
                                                    </div>
                                                    <div>
                                                        <h4
                                                            className="text-sm font-semibold mb-1"
                                                            style={{ color: '#8a2be2' }}
                                                        >
                                                            {t.similarLabel}
                                                        </h4>
                                                        <p
                                                            className="text-sm"
                                                            style={{ color: 'rgba(236, 236, 236, 0.8)' }}
                                                        >
                                                            {similarQuestion}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </div>

                            {/* Footer */}
                            <div
                                className="sticky bottom-0 p-4 border-t"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.98) 0%, rgba(30, 30, 50, 0.98) 100%)',
                                    borderColor: 'rgba(212, 175, 55, 0.2)',
                                }}
                            >
                                <button
                                    onClick={onClose}
                                    className="w-full py-3 px-6 rounded-xl font-semibold transition-all"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)',
                                        border: '1px solid rgba(212, 175, 55, 0.4)',
                                        color: '#D4AF37',
                                    }}
                                >
                                    {t.close}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
