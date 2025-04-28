import React from 'react';

type ButtonProps = {
  color?: 'blue' | 'gray' | 'primary';
  variant?: 'fill' | 'outline';
  fontSize?: 'small' | 'large';
  width?: string;
  height?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const colorMap = {
  'blue': {
    fill: 'bg-accent-blue text-white hover:bg-[#002DBA]',
    outline: 'bg-transparent border border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white',
  },
  'gray': {
    fill: 'bg-gray-400 text-white hover:bg-gray-600',
    outline: 'bg-transparent border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white',
  },
  'primary': {
    fill: 'bg-primary-800 text-white hover:bg-[#151D4A]',
    outline: 'bg-transparent border border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white',
  },
};

const Button = ({
  color = 'blue',
  variant = 'fill',
  fontSize = 'large',
  width = 'w-40',
  height = 'h-12',
  children,
  onClick,
}: ButtonProps) => {
  const baseStyle =
    'rounded-[6px] font-medium flex justify-center items-center';

  const variantStyle = colorMap[color][variant];

  const fontStyle = fontSize === 'large' ? 'text-xl' : 'text-base';
  const sizeStyle = `${width} ${height}`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${fontStyle} ${sizeStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
