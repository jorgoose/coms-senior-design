interface LightbulbIconProps {
  className?: string;
}

const LightbulbIcon: React.FC<LightbulbIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6B3FE7"
      strokeWidth="2"
      className={className}
    >
      <path d="M9 21h6"/>
      <path d="M10 17h4"/>
      <path d="M12 2a7 7 0 00-7 7c0 2.5 1.5 4.6 3.8 5.7.4.2.7.6.7 1v3h6v-3c0-.4.3-.8.7-1 2.3-1.1 3.8-3.2 3.8-5.7a7 7 0 00-7-7z"/>
    </svg>
  );
};

export default LightbulbIcon;