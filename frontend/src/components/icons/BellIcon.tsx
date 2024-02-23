interface BellIconProps {
  className?: string;
}

const BellIcon: React.FC<BellIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
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
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
            fill="url(#iconGradient)" 
        />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"
            fill="url(#iconGradient)" 
        />
    </svg>
  );
};

export default BellIcon;