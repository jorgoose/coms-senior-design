// src/components/ui/icons/GamepadIcon.tsx
interface GamepadIconProps {
  className?: string;
}

const GamepadIcon: React.FC<GamepadIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#292524"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#4F46E5' }} /> {/* from-blue-400 */}
          <stop offset="100%" style={{ stopColor: '#9333EA' }} /> {/* to-purple-500 */}
        </linearGradient>
      </defs>

      <path d="M2 6h20v12H2z" fill="url(#iconGradient)" />
      <path d="M6 12h4" />
      <path d="M8 10v4" />
      <path d="M15 13h0.01" />
      <path d="M18 11h0.01" />
    </svg>
  );
};

export default GamepadIcon;
