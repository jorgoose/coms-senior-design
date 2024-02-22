import React from 'react';

interface StarIconProps {
  className?: string;
}

const StarIcon: React.FC<StarIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 .587l3.668 7.425 8.332.961-6.04 5.884 1.427 8.31L12 18.896l-7.387 3.882 1.427-8.31-6.04-5.884 8.332-.961L12 .587z"/>
    </svg>
  );
};

export default StarIcon;