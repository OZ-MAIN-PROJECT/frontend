interface OptionItem {
  label: string;
  onClick: () => void;
  icon?: React.ElementType;
  isDestructive?: boolean;
}

interface SelectLayerProps {
  options: OptionItem[];
  onSelect: (option: OptionItem) => void;
}

const SelectLayer = ({ options, onSelect }: SelectLayerProps) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow flex flex-col w-auto"
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          className={`flex items-center gap-2 px-3 text-sm text-lef transition-colors bg-white hover:bg-white font-normal w-fit
            ${option.isDestructive ? "text-accent-red hover:text-accent-red" : "text-primary-500 hover:text-primary-800"}
          `}
        >
          {option.icon && <option.icon size={16} />}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SelectLayer;
