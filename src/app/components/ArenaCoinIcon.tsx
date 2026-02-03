import { SVGProps } from 'react';

interface ArenaCoinIconProps extends SVGProps<SVGSVGElement> {
    size?: number;
    color?: string;
}

export function ArenaCoinIcon({ size = 20, color = '#D4AF37', ...props }: ArenaCoinIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {/* Outer circle */}
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke={color}
                strokeWidth="1.5"
                fill="none"
            />

            {/* Inner circular Yuan-inspired symbol */}
            <path
                d="M 12 6 L 12 9 M 12 15 L 12 18"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            {/* Horizontal bars */}
            <path
                d="M 8 11 L 16 11 M 8 13 L 16 13"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            {/* Connect top to horizontal bars */}
            <path
                d="M 9 9 L 12 12 L 15 9"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}
