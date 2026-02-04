interface YuanIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function YuanIcon({ size = 24, color = '#D4AF37', className = '' }: YuanIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}
    >
      {/* Custom Yuan-like glyph - stylized Y with horizontal bars */}
      <path
        d="M6 4L12 12M18 4L12 12M12 12V20M8 14H16M8 17H16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
