interface LineChartIconProps {
  className?: string;
}

const LineChartIcon: React.FC<LineChartIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6B3FE7"
      strokeWidth="2"
      className={className}
      style={{ transform: 'scaleY(-1)' }}
    >
      
      <path d="M4 20V4a2 2 0 012-2h14"/>
      <path d="M4 10l5 5 5-5 5 5"/>
    </svg>
  );
};

export default LineChartIcon;