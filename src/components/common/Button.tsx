import React from 'react';

type ButtonProps = {
  className?: string;
  color?: 'blue' | 'gray' | 'primary';
  variant?: 'fill' | 'outline';
  fontSize?: 'small' | 'large';
  width?: string;
  height?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const colorMap = {
  blue: {
    fill: 'bg-accent-blue text-white hover:bg-accent-blue active:bg-accent-deepblue',
    outline:
      'bg-transparent border border-accent-blue text-accent-blue hover:bg-transparent active:text-white active:bg-accent-blue',
  },
  gray: {
    fill: 'bg-gray-400 text-white hover:bg-gray-400 active:bg-gray-600',
    outline:
      'bg-transparent border border-gray-400 text-gray-400 hover:bg-transparent active:text-white active:bg-gray-500',
  },
  primary: {
    fill: 'bg-primary-800 text-white hover:bg-primary-800 active:bg-primary-900',
    outline:
      'bg-transparent border border-primary-800 text-primary-800 hover:bg-transparent active:text-white active:bg-primary-800',
  },
};

const Button = ({
  className='',
  color = 'blue',
  variant = 'fill',
  fontSize = 'large',
  width = 'w-[200px]',
  height = 'h-[60px]',
  children,
  onClick,
  type = 'button'
}: ButtonProps) => {
  const baseStyle = 'rounded-[6px] font-medium flex justify-center items-center';

  const variantStyle = colorMap[color][variant];

  const fontStyle = fontSize === 'large' ? 'text-xl' : 'text-base';
  const sizeStyle = `${width} ${height}`;

  return (
    <button type={type} onClick={onClick} className={`${className} ${baseStyle} ${variantStyle} ${fontStyle} ${sizeStyle}`}>
      {children}
    </button>
  );
};

export default Button;
