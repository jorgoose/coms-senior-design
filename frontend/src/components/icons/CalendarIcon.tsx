interface CalendarIconProps {
  className?: string;
}

const CalendarIcon: React.FC<CalendarIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6B3FE7"
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
      {/* Rectangle converted to path */}
      <path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" 
        
      />
      {/* Lines converted to paths */}
      <path d="M16 2v4" fill="url(#iconGradient)"  />
      <path d="M8 2v4" fill="url(#iconGradient)"  />
      <path d="M3 10h18" fill="url(#iconGradient)"  />
    </svg>
  );
};

export default CalendarIcon;