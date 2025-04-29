interface OptionItem {
  label: string;
  onClick: () => void;
  icon?: React.ElementType;
  className?: string
}

interface SelectLayerProps {
  options: OptionItem[];
  onSelect: (option: OptionItem) => void;
}

const SelectLayer = ({ options, onSelect }: SelectLayerProps) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow flex flex-col w-auto px-2 py-1"
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          className={`flex items-center gap-1.5 p-1 text-sm text-lef transition-colors bg-white hover:bg-white font-normal w-fit
            ${option.className ?? ""}
          `}
        >
          {option.icon && <option.icon size={16} strokeWidth={1.75} />}
          <span className="text-sm">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SelectLayer;
