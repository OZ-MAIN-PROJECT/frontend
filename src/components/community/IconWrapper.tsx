import { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  fill?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

const IconWrapper = ({
  icon: Icon,
  size = 20,
  color = '#9ca3af',
  fill = 'none',
  onClick,
  className = '',
  ariaLabel,
}: IconWrapperProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex items-center justify-center w-6 h-6 ${className}`}
    >
      <Icon size={size} color={color} fill={fill} />
    </button>
  );
};

export default IconWrapper;
