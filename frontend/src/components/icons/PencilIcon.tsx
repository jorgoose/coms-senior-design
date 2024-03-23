interface PencilIconProps {
    className?: string;
  }
  
  const PencilIcon: React.FC<PencilIconProps> = ({ className }) => {
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
        <path d="M12 19l4.6-4.6c.5-.5 1.2-.5 1.7 0l1.3 1.3c.5.5.5 1.2 0 1.7L14.7 22H12v-2.7zM10 17l-1-1" />
        <path d="M5.3 18.1l1.4-4.3L15 7.6 11.4 4 5.3 18.1zM15 7.6l1.7-1.7L19.4 7" />
      </svg>
    );
  };
  
  export default PencilIcon;
  