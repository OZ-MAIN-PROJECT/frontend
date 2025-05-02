import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  items: string[];
  selected: string;
  onSelect: (item: string) => void;
}

const DropdownInput = ({ items, selected, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block mb-4">
      <div className="flex items-center bg-white h-[60px] w-[500px] border border-gray-300 rounded-md px-3 py-2 text-sm">
        <span className="text-sm flex-grow text-gray-900">
          {selected || <span className="text-gray-400">질문을 선택하세요.</span>}
        </span>
        <button type="button" onClick={() => setIsOpen(prev => !prev)} className="ml-2">
          <ChevronDown />
        </button>
      </div>

      {isOpen && (
        <ul className="absolute left-0 w-[500px] border rounded bg-white shadow z-10 text-gray-600">
          {items.map(item => (
            <li
              key={item}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
              className="border-b-[1px] px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownInput;
