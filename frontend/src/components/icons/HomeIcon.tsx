interface HomeIconProps {
  className?: string;
}

const HomeIcon: React.FC<HomeIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6B3FE7"
      strokeWidth="2"
      className={className}
    >
      
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <path d="M9 22V12h6v10"/>
    </svg>
  );
};

export default HomeIcon;