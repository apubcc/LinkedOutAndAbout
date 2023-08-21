import React from 'react';

const FrostedGlassBox = ({ children, className }) => {
  return (
    <div className={`box my-4 mx-2 shadow-lg w-96 h-48 rounded-lg backdrop-blur-md backdrop-brightness-150 bg-opacity-0 bg-white p-4 ${className}`}>
      {children}
    </div>
  );
};

export default FrostedGlassBox;
