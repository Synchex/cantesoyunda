import { GameButton } from './GameButton';
import { GameCard } from './GameCard';
import { CircularTimer } from './CircularTimer';
import { ProgressBar } from './ProgressBar';
import { Trophy, Zap, Star } from 'lucide-react';

export function DesignSystem() {
  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-white p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-[var(--gold)] via-[var(--purple)] to-[var(--neon-green)] bg-clip-text text-transparent">
            Trivia Game Design System
          </h1>
          <p className="text-[var(--muted-foreground)]">
            A dramatic TV quiz-show inspired component library
          </p>
        </div>

        {/* Color Tokens */}
        <section>
          <h2 className="text-3xl mb-6 text-[var(--gold)]">Color Tokens</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-[var(--gold)] border-2 border-[var(--gold)]" />
              <div className="text-sm">
                <div>Gold</div>
                <code className="text-xs text-[var(--muted-foreground)]">#ffd700</code>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-[var(--purple)] border-2 border-[var(--purple)]" />
              <div className="text-sm">
                <div>Electric Purple</div>
                <code className="text-xs text-[var(--muted-foreground)]">#a855f7</code>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-[var(--neon-green)] border-2 border-[var(--neon-green)]" />
              <div className="text-sm">
                <div>Neon Green</div>
                <code className="text-xs text-[var(--muted-foreground)]">#00ff88</code>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-[var(--wrong)] border-2 border-[var(--wrong)]" />
              <div className="text-sm">
                <div>Wrong Answer</div>
                <code className="text-xs text-[var(--muted-foreground)]">#ff1744</code>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-[var(--bg-dark)] border-2 border-[var(--border)]" />
              <div className="text-sm">
                <div>BG Dark</div>
                <code className="text-xs text-[var(--muted-foreground)]">#0a0514</code>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-[var(--card)] border-2 border-[var(--border)]" />
              <div className="text-sm">
                <div>Card</div>
                <code className="text-xs text-[var(--muted-foreground)]">#1a0f2e</code>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]" />
              <div className="text-sm">
                <div>Muted</div>
                <code className="text-xs text-[var(--muted-foreground)]">#2d1b4e</code>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Scale */}
        <section>
          <h2 className="text-3xl mb-6 text-[var(--gold)]">Typography Scale</h2>
          <div className="space-y-4 bg-[var(--card)] p-6 rounded-xl border border-[var(--border)]">
            <div style={{ fontSize: 'var(--text-6xl)' }}>Heading 6XL (3.75rem)</div>
            <div style={{ fontSize: 'var(--text-5xl)' }}>Heading 5XL (3rem)</div>
            <div style={{ fontSize: 'var(--text-4xl)' }}>Heading 4XL (2.25rem)</div>
            <div style={{ fontSize: 'var(--text-3xl)' }}>Heading 3XL (1.875rem)</div>
            <div style={{ fontSize: 'var(--text-2xl)' }}>Heading 2XL (1.5rem)</div>
            <div style={{ fontSize: 'var(--text-xl)' }}>Heading XL (1.25rem)</div>
            <div style={{ fontSize: 'var(--text-lg)' }}>Text Large (1.125rem)</div>
            <div style={{ fontSize: 'var(--text-base)' }}>Text Base (1rem)</div>
            <div style={{ fontSize: 'var(--text-sm)' }}>Text Small (0.875rem)</div>
            <div style={{ fontSize: 'var(--text-xs)' }}>Text XS (0.75rem)</div>
          </div>
        </section>

        {/* Spacing System */}
        <section>
          <h2 className="text-3xl mb-6 text-[var(--gold)]">Spacing System</h2>
          <div className="space-y-3 bg-[var(--card)] p-6 rounded-xl border border-[var(--border)]">
            <div className="flex items-center gap-4">
              <div className="w-[var(--spacing-xs)] h-8 bg-[var(--purple)]" />
              <span>XS: 0.25rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[var(--spacing-sm)] h-8 bg-[var(--purple)]" />
              <span>SM: 0.5rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[var(--spacing-md)] h-8 bg-[var(--purple)]" />
              <span>MD: 1rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[var(--spacing-lg)] h-8 bg-[var(--purple)]" />
              <span>LG: 1.5rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[var(--spacing-xl)] h-8 bg-[var(--purple)]" />
              <span>XL: 2rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[var(--spacing-2xl)] h-8 bg-[var(--purple)]" />
              <span>2XL: 3rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[var(--spacing-3xl)] h-8 bg-[var(--purple)]" />
              <span>3XL: 4rem</span>
            </div>
          </div>
        </section>

        {/* Corner Radius */}
        <section>
          <h2 className="text-3xl mb-6 text-[var(--gold)]">Corner Radius Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-20 bg-[var(--purple)] border-2 border-[var(--purple-bright)]" style={{ borderRadius: 'var(--radius-sm)' }} />
              <div className="text-sm">SM: 0.5rem</div>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[var(--purple)] border-2 border-[var(--purple-bright)]" style={{ borderRadius: 'var(--radius-md)' }} />
              <div className="text-sm">MD: 0.75rem</div>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[var(--purple)] border-2 border-[var(--purple-bright)]" style={{ borderRadius: 'var(--radius-lg)' }} />
              <div className="text-sm">LG: 1rem</div>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[var(--purple)] border-2 border-[var(--purple-bright)]" style={{ borderRadius: 'var(--radius-xl)' }} />
              <div className="text-sm">XL: 1.5rem</div>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[var(--purple)] border-2 border-[var(--purple-bright)]" style={{ borderRadius: 'var(--radius-2xl)' }} />
              <div className="text-sm">2XL: 2rem</div>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-[var(--purple)] border-2 border-[var(--purple-bright)]" style={{ borderRadius: 'var(--radius-full)' }} />
              <div className="text-sm">Full: 9999px</div>
            </div>
          </div>
        </section>

        {/* Button Variants */}
        <section>
          <h2 className="text-3xl mb-6 text-[var(--gold)]">Button Variants</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <GameButton variant="primary">Primary Button</GameButton>
              <GameButton variant="secondary">Secondary Button</GameButton>
              <GameButton variant="gold">Gold Button</GameButton>
              <GameButton variant="answer">Answer Button</GameButton>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <GameButton variant="primary" size="sm">Small</GameButton>
              <GameButton variant="primary" size="md">Medium</GameButton>
              <GameButton variant="primary" size="lg">Large</GameButton>
              <GameButton variant="primary" size="xl">Extra Large</GameButton>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <GameButton variant="primary" disabled>Disabled</GameButton>
            </div>
          </div>
        </section>

        {/* Card Components */}
        <section>
          <h2 className="text-3xl mb-6 text-[var(--gold)]">Card Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GameCard icon={<Trophy size={48} />}>
              <h3 className="text-center">Trophy Card</h3>
              <p className="text-sm text-center text-[var(--muted-foreground)] mt-2">
                With icon and content
              </p>
            </GameCard>
            
            <GameCard icon={<Zap size={48} />} glowing>
              <h3 className="text-center">Glowing Card</h3>
              <p className="text-sm text-center text-[var(--muted-foreground)] mt-2">
                With glow effect
              </p>
            </GameCard>
            
            <GameCard icon={<Star size={48} />}>
              <h3 className="text-center">Star Card</h3>
              <p className="text-sm text-center text-[var(--muted-foreground)] mt-2">
                Hover for spotlight
              </p>
            </GameCard>
          </div>
        </section>

        {/* Progress Bars */}
        <section>
          <h2 className="text-3xl mb-6 text-[var(--gold)]">Progress Bars</h2>
          <div className="space-y-6 bg-[var(--card)] p-6 rounded-xl border border-[var(--border)]">
            <ProgressBar current={3} total={12} />
            <ProgressBar current={6} total={12} />
            <ProgressBar current={9} total={12} />
            <ProgressBar current={12} total={12} />
          </div>
        </section>

        {/* Timers */}
        <section>
          <h2 className="text-3xl mb-6 text-[var(--gold)]">Circular Timers</h2>
          <div className="flex gap-8 justify-center bg-[var(--card)] p-8 rounded-xl border border-[var(--border)]">
            <div className="text-center space-y-2">
              <CircularTimer duration={20} size={80} />
              <div className="text-sm text-[var(--muted-foreground)]">Default (80px)</div>
            </div>
            <div className="text-center space-y-2">
              <CircularTimer duration={15} size={100} />
              <div className="text-sm text-[var(--muted-foreground)]">Large (100px)</div>
            </div>
            <div className="text-center space-y-2">
              <CircularTimer duration={10} size={120} />
              <div className="text-sm text-[var(--muted-foreground)]">XL (120px)</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
