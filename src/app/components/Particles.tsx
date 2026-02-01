import { motion } from 'motion/react';

interface ParticlesProps {
  count?: number;
  color?: string;
}

export function Particles({ count = 12, color = 'var(--gold)' }: ParticlesProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(count)].map((_, i) => {
        const angle = (i * 2 * Math.PI) / count;
        const distance = 100 + Math.random() * 50;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}`,
            }}
            initial={{ 
              opacity: 1, 
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: 0,
              scale: [0, 1, 0],
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
            }}
            transition={{ 
              duration: 0.8,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </div>
  );
}
