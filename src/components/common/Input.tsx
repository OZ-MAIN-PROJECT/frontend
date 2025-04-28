

import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
 
}

const Input: React.FC<InputProps> = ({
  className,
 
  ...props
}) => {

  const inputBaseStyles = 'border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue disabled:opacity-50 disabled:cursor-not-allowed';

 

  const inputCombinedClassName = `${inputBaseStyles} ${className || ''}`;

  const containerBaseStyles = 'mb-4';




  return (
    <div className={containerBaseStyles}>
      <input
        {...props}
        className={inputCombinedClassName}
      />
    </div>
  );
};

export default Input;
