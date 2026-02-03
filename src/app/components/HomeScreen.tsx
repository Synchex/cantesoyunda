import { motion } from 'motion/react';
import { GameButton } from './GameButton';
import { Language, getTranslation } from '../data/translations';
import { CreditBar } from './CreditBar';

interface HomeScreenProps {
  onStartGame: () => void;
  language: Language;
}

export function HomeScreen({ onStartGame, language }: HomeScreenProps) {
  const t = (key: any) => getTranslation(language, key);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#0E0E16' }}>
      {/* Credit Bar */}
      <CreditBar language={language} />

      {/* ============ LAYERED BACKGROUND SYSTEM ============ */}

      {/* Layer 1: Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0E0E16 0%, #1a1a2e 50%, #0E0E16 100%)',
        }}
      />

      {/* Layer 2: Stadium curved seating silhouette */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {/* Left seating section */}
        <div
          className="absolute left-0 top-1/4 w-1/3 h-1/2"
          style={{
            background: 'radial-gradient(ellipse at right, rgba(30, 30, 45, 0.8) 0%, transparent 70%)',
            clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 20% 50%)',
          }}
        />
        {/* Right seating section */}
        <div
          className="absolute right-0 top-1/4 w-1/3 h-1/2"
          style={{
            background: 'radial-gradient(ellipse at left, rgba(30, 30, 45, 0.8) 0%, transparent 70%)',
            clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 80% 50%)',
          }}
        />
        {/* Top curved seating */}
        <div
          className="absolute top-0 left-1/4 w-1/2 h-1/3"
          style={{
            background: 'radial-gradient(ellipse at bottom, rgba(30, 30, 45, 0.6) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Layer 3: Audience silhouette with bokeh lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Crowd silhouette layer */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 opacity-15"
          style={{
            background: 'linear-gradient(to top, rgba(20, 20, 30, 1) 0%, transparent 100%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Bokeh/camera flash lights above crowd */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 30}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#ffffff' : '#2C2F6F',
              opacity: 0,
              filter: 'blur(2px)',
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Layer 4: Haze/fog texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(44, 47, 111, 0.1) 0%, transparent 50%)
          `,
          filter: 'blur(60px)',
        }}
      />

      {/* Layer 5: Radial spotlight from top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.12) 0%, transparent 60%)',
        }}
      />

      {/* Layer 6: Diagonal light beams (sweeping) */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${20 + i * 30}%`,
            width: '2px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(212, 175, 55, 0.15) 50%, transparent 100%)',
            transformOrigin: 'top',
            filter: 'blur(1px)',
          }}
          animate={{
            rotateZ: [-2, 2, -2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Layer 7: Cinematic dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'rgba(212, 175, 55, 0.4)',
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -150],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* ============ STAGE DECORATIVE ELEMENTS ============ */}

      {/* Semi-circular stage arcs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer arc */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            border: '1px solid #D4AF37',
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.2)',
          }}
        />
        {/* Inner arc */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            border: '1px solid #D4AF37',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)',
          }}
        />
      </div>

      {/* LED panel patterns at edges */}
      <div className="absolute top-0 left-0 right-0 h-1 opacity-30 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, #D4AF37 10px, #D4AF37 11px)',
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 opacity-30 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, #D4AF37 10px, #D4AF37 11px)',
          }}
        />
      </div>

      {/* Thin gold framing lines */}
      <div className="absolute top-20 left-10 right-10 h-px opacity-20 pointer-events-none" style={{ background: '#D4AF37' }} />
      <div className="absolute bottom-20 left-10 right-10 h-px opacity-20 pointer-events-none" style={{ background: '#D4AF37' }} />

      {/* ============ CONTENT ============ */}

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Title with metallic gold bevel */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <h1
            className="text-8xl md:text-9xl mb-4 tracking-tight leading-none"
            style={{
              background: 'linear-gradient(180deg, #F4E4C1 0%, #D4AF37 50%, #A67C00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 900,
              textShadow: '0 4px 20px rgba(212, 175, 55, 0.4), 0 1px 0 rgba(244, 228, 193, 0.5)',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
            }}
          >
            {t('appTitle')}
          </h1>

          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div
              className="absolute -inset-2 rounded-lg opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
                filter: 'blur(10px)',
              }}
            />
            <p
              className="relative text-sm uppercase tracking-[0.3em] py-2 px-6"
              style={{
                color: '#ECECEC',
                fontWeight: 600,
                background: 'linear-gradient(90deg, transparent, rgba(30, 30, 45, 0.8), transparent)',
                borderLeft: '1px solid rgba(212, 175, 55, 0.3)',
                borderRight: '1px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              {language === 'tr' ? 'Sahneye Çık' : 'Step Into The Arena'}
            </p>
          </motion.div>
        </motion.div>

        {/* Brushed metal start button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <motion.button
            onClick={onStartGame}
            className="relative px-24 py-7 rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.25) 0%, rgba(166, 124, 0, 0.15) 100%)',
              border: '2px solid rgba(212, 175, 55, 0.6)',
              boxShadow: '0 0 40px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 0 60px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            }}
            whileTap={{
              scale: 0.98,
              background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.35) 0%, rgba(166, 124, 0, 0.25) 100%)',
            }}
          >
            {/* Inner glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
              }}
              whileHover={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />

            {/* Brushed metal texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)',
              }}
            />

            <span
              className="relative z-10 text-3xl uppercase tracking-[0.15em]"
              style={{
                color: '#ECECEC',
                fontWeight: 800,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              }}
            >
              {t('startGame')}
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}