import React from 'react';

interface BackArrowButtonProps {
  onClick: () => void;
}

const BackArrowButton: React.FC<BackArrowButtonProps> = ({ onClick }) => {
  return (
    <button
      className="absolute top-4 left-4 p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition duration-300"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

export default BackArrowButton;
