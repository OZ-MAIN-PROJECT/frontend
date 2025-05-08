interface IconButtonProps {
  icon: React.ElementType;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

const IconButton = ({ icon: Icon, onClick, className = '', ariaLabel }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`w-12 h-12 p-0 rounded-full flex items-center justify-center shadow-md bg-accent-blue hover:bg-primary-800 text-white transition-colors ${className}`}
    >
      <Icon size={20} />
    </button>
  );
};

export default IconButton;
